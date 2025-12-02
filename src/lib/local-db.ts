
export interface DocumentData {
    [key: string]: any;
}

export interface QuerySnapshot<T = DocumentData> {
    docs: QueryDocumentSnapshot<T>[];
    empty: boolean;
    size: number;
    forEach(callback: (result: QueryDocumentSnapshot<T>) => void): void;
}

export interface QueryDocumentSnapshot<T = DocumentData> {
    id: string;
    exists(): boolean;
    data(): T;
}

export class LocalDB {
    private storageKey = 'neurogrip_db';
    private data: Record<string, Record<string, any>> = {};
    private listeners: Record<string, Function[]> = {};

    constructor() {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.data = JSON.parse(stored);
            } else {
                // Seed with some initial data if needed
                this.data = {
                    patients: {},
                    users: {}
                };
                this.save();

                // Auto-seed with sample data on first load
                if (typeof window !== 'undefined') {
                    import('./seed-data').then(({ seedDatabase }) => {
                        if (seedDatabase()) {
                            // Reload data after seeding
                            const stored = localStorage.getItem(this.storageKey);
                            if (stored) {
                                this.data = JSON.parse(stored);
                                // Notify listeners that data has changed
                                this.notify('patients');
                                // Also notify individual document paths
                                if (this.data.patients) {
                                    Object.keys(this.data.patients).forEach(id => {
                                        this.notify(`patients/${id}`);
                                    });
                                }
                            }
                        }
                    });
                }
            }
        }
    }

    subscribe(path: string, callback: Function) {
        if (!this.listeners[path]) {
            this.listeners[path] = [];
        }
        this.listeners[path].push(callback);
        return () => {
            this.listeners[path] = this.listeners[path].filter(cb => cb !== callback);
        };
    }

    public notify(path: string) {
        // Notify collection listeners
        if (this.listeners[path]) {
            this.listeners[path].forEach(cb => cb());
        }
        // Notify document listeners? (Not implementing granular doc listeners for now, just collection level)
    }

    private save() {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        }
    }

    collection(path: string) {
        if (!this.data[path]) {
            this.data[path] = {};
            this.save();
        }
        return new CollectionReference(this, path);
    }

    doc(path: string, id: string) {
        return new DocumentReference(this, path, id);
    }

    // Helper to get raw data
    getData() {
        return this.data;
    }
}

export class CollectionReference<T = DocumentData> {
    readonly type = 'collection';
    constructor(public db: LocalDB, public path: string) { }

    async add(data: any): Promise<DocumentReference> {
        const id = Math.random().toString(36).substring(2, 15);
        console.log(`[LocalDB] Adding document to ${this.path} with ID: ${id}`);
        const docRef = new DocumentReference(this.db, this.path, id);
        await docRef.set(data);
        return docRef;
    }
}

export class DocumentReference<T = DocumentData> {
    constructor(private db: LocalDB, public collectionPath: string, public id: string) { }

    get path() {
        return `${this.collectionPath}/${this.id}`;
    }

    async set(data: any, options?: { merge?: boolean }) {
        const collection = this.db.getData()[this.collectionPath] || {};
        if (options?.merge && collection[this.id]) {
            collection[this.id] = { ...collection[this.id], ...data };
        } else {
            collection[this.id] = data;
        }
        this.db.getData()[this.collectionPath] = collection;
        (this.db as any).save();
        (this.db as any).notify(this.collectionPath);
        (this.db as any).notify(this.path);
    }

    async update(data: any) {
        const collection = this.db.getData()[this.collectionPath];
        if (!collection || !collection[this.id]) {
            throw new Error('Document does not exist');
        }
        collection[this.id] = { ...collection[this.id], ...data };
        (this.db as any).save();
        (this.db as any).notify(this.collectionPath);
        (this.db as any).notify(this.path);
    }

    async delete() {
        const collection = this.db.getData()[this.collectionPath];
        if (collection) {
            delete collection[this.id];
            (this.db as any).save();
            (this.db as any).notify(this.collectionPath);
            (this.db as any).notify(this.path);
        }
    }

    async get(): Promise<QueryDocumentSnapshot> {
        const collection = this.db.getData()[this.collectionPath];
        const data = collection ? collection[this.id] : undefined;

        if (!data) {
            console.log(`[LocalDB] Document not found: ${this.collectionPath}/${this.id}`);
            console.log(`[LocalDB] Available IDs in ${this.collectionPath}:`, collection ? Object.keys(collection) : 'Collection not found');
        } else {
            console.log(`[LocalDB] Document found: ${this.collectionPath}/${this.id}`);
        }

        return {
            id: this.id,
            exists: () => !!data,
            data: () => data,
        };
    }
}

export const db = new LocalDB();
