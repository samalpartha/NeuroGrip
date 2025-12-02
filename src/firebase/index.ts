'use client';

import { firebaseConfig } from '@/firebase/config';

// import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore'
import { getFirestore } from '@/lib/db';
import { getAuth, mockAuth } from '@/lib/mock-auth';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  // Always return mocks for local dev
  return getSdks({} as any);
}

export function getSdks(firebaseApp: any) {
  return {
    firebaseApp,
    auth: mockAuth,
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './errors';
export * from './error-emitter';
