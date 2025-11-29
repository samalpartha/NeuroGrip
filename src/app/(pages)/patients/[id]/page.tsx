'use client';

import { PatientDetails } from '@/components/patients/patient-details';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { User } from 'lucide-react';
import type { Patient } from '@/lib/types';

function PatientDetailPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();

  const patientDocRef = useMemoFirebase(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, 'patients', params.id);
  }, [firestore, params.id]);

  const { data: patient, isLoading } = useDoc<Patient>(patientDocRef);

  if (isLoading) {
    return <div>Loading patient details...</div>;
  }

  if (!patient) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Patient Profile</h1>
      </div>
      <PatientDetails patient={patient} />
    </div>
  );
}

export default PatientDetailPage;
