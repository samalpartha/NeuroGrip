
import { db, DocumentReference, CollectionReference, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from './local-db';

// Mock Timestamp
export class Timestamp {
    seconds: number;
    nanoseconds: number;

    constructor(seconds: number, nanoseconds: number) {
        this.seconds = seconds;
        this.nanoseconds = nanoseconds;
    }

    toDate(): Date {
        return new Date(this.seconds * 1000 + this.nanoseconds / 1000000);
    }

    static now(): Timestamp {
        const now = new Date();
        return new Timestamp(Math.floor(now.getTime() / 1000), (now.getTime() % 1000) * 1000000);
    }

    static fromDate(date: Date): Timestamp {
        return new Timestamp(Math.floor(date.getTime() / 1000), (date.getTime() % 1000) * 1000000);
    }
}

export const serverTimestamp = () => Timestamp.now();

// Mock Firestore types
export type Firestore = any;
export type Query<T = DocumentData> = {
    type: 'query';
    collectionPath: string;
    filters: any[];
};

export type { DocumentData, QuerySnapshot, QueryDocumentSnapshot };
export type DocumentSnapshot<T = DocumentData> = QueryDocumentSnapshot<T>;
export { CollectionReference, DocumentReference };

export const getFirestore = (app?: any) => {
    return db;
};

export const collection = (firestore: any, path: string) => {
    return db.collection(path);
};

export const doc = (firestore: any, path: string, ...pathSegments: string[]) => {
    // Handle doc(collectionRef, id) or doc(firestore, path)
    if (firestore instanceof CollectionReference) {
        return firestore.db.doc(firestore.path, path);
    }
    // Simplified: assume path is collection/id
    const parts = path.split('/');
    if (parts.length === 2) {
        return db.doc(parts[0], parts[1]);
    }
    // Or if pathSegments are provided
    if (pathSegments.length > 0) {
        return db.doc(path, pathSegments[0]);
    }
    throw new Error('Invalid doc path');
};

export const addDoc = async (collectionRef: CollectionReference, data: any) => {
    return await collectionRef.add(data);
};

export const updateDoc = async (docRef: DocumentReference, data: any) => {
    return await docRef.update(data);
};

export const setDoc = async (docRef: DocumentReference, data: any, options?: { merge?: boolean }) => {
    return await docRef.set(data, options);
};

export const deleteDoc = async (docRef: DocumentReference) => {
    return await docRef.delete();
};

export const getDoc = async (docRef: DocumentReference) => {
    return await docRef.get();
};

export const getDocs = async (queryOrRef: CollectionReference | Query) => {
    let collectionPath = '';
    let filters: any[] = [];

    if (queryOrRef instanceof CollectionReference) {
        collectionPath = queryOrRef.path;
    } else {
        collectionPath = queryOrRef.collectionPath;
        filters = queryOrRef.filters;
    }

    const collectionRef = db.collection(collectionPath);
    // Hack to access internal DB data
    const allData = (db as any).getData()[collectionPath] || {};

    let docs = Object.entries(allData).map(([id, data]: [string, any]) => ({
        id,
        exists: () => true,
        data: () => data,
    }));

    // Apply filters (simple implementation)
    for (const filter of filters) {
        if (filter.type === 'where') {
            docs = docs.filter(doc => {
                const val = doc.data()[filter.field];
                if (filter.op === '==') return val === filter.value;
                // Add other ops if needed
                return true;
            });
        }
    }

    return {
        docs,
        empty: docs.length === 0,
        size: docs.length,
        forEach: (cb: any) => docs.forEach(cb),
    } as QuerySnapshot;
};

export const query = (collectionRef: CollectionReference, ...constraints: any[]) => {
    return {
        type: 'query',
        collectionPath: collectionRef.path,
        filters: constraints,
    } as Query;
};

export const where = (field: string, op: string, value: any) => {
    return { type: 'where', field, op, value };
};

export const orderBy = (field: string, direction?: 'asc' | 'desc') => {
    return { type: 'orderBy', field, direction };
};

export const limit = (n: number) => {
    return { type: 'limit', value: n };
};

export function onSnapshot(
    query: Query | CollectionReference,
    onNext: (snapshot: QuerySnapshot) => void,
    onError?: (error: any) => void
): () => void;
export function onSnapshot(
    docRef: DocumentReference,
    onNext: (snapshot: DocumentSnapshot) => void,
    onError?: (error: any) => void
): () => void;
export function onSnapshot(
    queryOrRef: CollectionReference | Query | DocumentReference,
    onNext: any,
    onError?: (error: any) => void
) {
    let subscriptionPath = '';
    let isDoc = false;

    if (queryOrRef instanceof CollectionReference) {
        subscriptionPath = queryOrRef.path;
    } else if (queryOrRef instanceof DocumentReference) {
        subscriptionPath = queryOrRef.path; // Use full path (e.g., "patients/id")
        isDoc = true;
    } else {
        subscriptionPath = queryOrRef.collectionPath;
    }

    const update = async () => {
        try {
            if (isDoc) {
                const docRef = queryOrRef as DocumentReference;
                const snapshot = await getDoc(docRef);
                onNext(snapshot);
            } else {
                const snapshot = await getDocs(queryOrRef as CollectionReference | Query);
                onNext(snapshot);
            }
        } catch (e) {
            if (onError) onError(e);
        }
    };

    // Initial call
    update();

    // Subscribe to changes
    return (db as any).subscribe(subscriptionPath, update);
};

// Error types
export class FirestoreError extends Error {
    code: string;
    constructor(code: string, message: string) {
        super(message);
        this.code = code;
    }
}
