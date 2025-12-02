
export const mockUser = {
    uid: 'test-user-id',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://picsum.photos/seed/test/100/100',
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: '',
    tenantId: null,
    delete: async () => { },
    getIdToken: async () => 'mock-token',
    getIdTokenResult: async () => ({ token: 'mock-token' } as any),
    reload: async () => { },
    toJSON: () => ({}),
    phoneNumber: null,
};

export const mockAuth = {
    currentUser: mockUser,
    signOut: async () => { },
    onAuthStateChanged: (nextOrObserver: any) => {
        if (typeof nextOrObserver === 'function') {
            nextOrObserver(mockUser);
        }
        return () => { };
    },
    updateCurrentUser: async () => { },
};

export type Auth = typeof mockAuth;
export type User = typeof mockUser;

export const getAuth = (app?: any) => mockAuth;
export const onAuthStateChanged = (auth: any, nextOrObserver: any, onError?: any) => {
    return mockAuth.onAuthStateChanged(nextOrObserver);
};

export const createUserWithEmailAndPassword = async (auth: any, email: string, password: string) => {
    return { user: mockUser };
};

export const updateProfile = async (user: any, profile: any) => {
    // Mock update
};

export const signInWithEmailAndPassword = async (auth: any, email: string, password: string) => {
    return { user: mockUser };
};

export const signOut = async (auth: any) => {
    // Mock sign out
};

export const signInAnonymously = async (auth: any) => {
    return { user: mockUser };
};
