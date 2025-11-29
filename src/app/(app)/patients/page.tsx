'use client';

import { PatientList } from '@/components/patients/patient-list';
import type { Patient } from '@/lib/types';
import { Loader2, Users } from 'lucide-react';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

function PatientsPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  // This is the critical part:
  // 1. useMemoFirebase ensures the query object is stable between re-renders.
  // 2. The factory function checks for `firestore` and `user` *before* creating the query.
  // 3. This guarantees the query is never created with a null `user.uid`.
  const patientsQuery = useMemoFirebase(() => {
    if (!firestore || !user) {
      return null;
    }
    return query(collection(firestore, 'patients'), where('therapistId', '==', user.uid));
  }, [firestore, user]); // Dependencies are `firestore` and `user`

  // useCollection will now receive a `null` query until user is loaded,
  // and will correctly re-run when the query becomes available.
  const { data: patients, isLoading } = useCollection<Patient>(patientsQuery);

  // The content is loading if the hook is loading OR if the query is still null (because user/firestore aren't ready)
  const isContentLoading = isLoading || !patientsQuery;

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
