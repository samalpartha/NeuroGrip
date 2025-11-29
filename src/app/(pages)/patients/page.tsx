'use client';

import { PatientList } from '@/components/patients/patient-list';
import type { Patient } from '@/lib/types';
import { Users } from 'lucide-react';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

function PatientsPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  const patientsQuery = useMemoFirebase(() => {
    // Only create the query if the user and firestore instances are available.
    if (!user || !firestore) return null;
    return query(collection(firestore, 'patients'), where('therapistId', '==', user.uid));
  }, [firestore, user]);

  const { data: patients, isLoading } = useCollection<Patient>(patientsQuery);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Manage Patients</h1>
      </div>
      {isLoading && !patients ? (
        <p>Loading patients...</p>
      ) : (
        <PatientList patients={patients || []} />
      )}
    </div>
  );
}

export default PatientsPage;
