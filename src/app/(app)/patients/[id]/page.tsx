'use client';

import { PatientDetails } from '@/components/patients/patient-details';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { notFound, useRouter } from 'next/navigation';
import { Loader2, User } from 'lucide-react';
import type { Patient } from '@/lib/types';
import { useEffect } from 'react';

function PatientDetailPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const { user } = useUser();
  const router = useRouter();

  const patientDocRef = useMemoFirebase(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, 'patients', params.id);
  }, [firestore, params.id]);

  const { data: patient, isLoading } = useDoc<Patient>(patientDocRef);

  useEffect(() => {
    if (!isLoading && patient && user && patient.therapistId !== user.uid) {
      // This patient does not belong to the logged-in therapist.
      // This check is important because the security rules for 'get'
      // will block this on the server, but this provides a cleaner user experience.
      router.replace('/patients');
    }
  }, [patient, isLoading, user, router]);


  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!patient) {
    return notFound();
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
