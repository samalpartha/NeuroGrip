'use client';

import { PatientList } from '@/components/patients/patient-list';
import type { Patient } from '@/lib/types';
import { Loader2, Users } from 'lucide-react';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

function PatientsPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  const patientsQuery = useMemoFirebase(() => {
    // IMPORTANT: Only construct the query if we have a user and firestore instance.
    // This prevents queries with a null UID, which security rules would block.
    if (!user || !firestore) {
      return null;
    }
    return query(collection(firestore, 'patients'), where('therapistId', '==', user.uid));
  }, [firestore, user]);

  const { data: patients, isLoading } = useCollection<Patient>(patientsQuery);

  // The isLoading state from useCollection will be true until the query is run and data is fetched.
  // We also check if patients is null because the query itself is null until the user is loaded.
  const isContentLoading = isLoading || patients === null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Manage Patients</h1>
      </div>
      {isContentLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <PatientList patients={patients || []} />
      )}
    </div>
  );
}

export default PatientsPage;
