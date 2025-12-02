'use client';

import { PatientDetails } from '@/components/patients/patient-details';
import { ExerciseRecommendations } from '@/components/patients/exercise-recommendations';
import { ProgressTimeline } from '@/components/patients/progress-timeline';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc } from '@/lib/db';
import { notFound, useRouter } from 'next/navigation';
import { Loader2, User } from 'lucide-react';
import type { Patient } from '@/lib/types';
import { useEffect, use } from 'react';

function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  console.log('PatientDetailPage mounted with ID:', id);

  const firestore = useFirestore();
  const { user } = useUser();
  const router = useRouter();

  const patientDocRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    console.log('Creating doc ref for:', id);
    return doc(firestore, 'patients', id);
  }, [firestore, id]);

  const { data: patient, isLoading } = useDoc<Patient>(patientDocRef);
  console.log('useDoc result:', { isLoading, patient, error: null });

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

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <PatientDetails patient={patient} />
        </div>
        <div className="space-y-6">
          <ExerciseRecommendations patient={patient} />
          <ProgressTimeline patient={patient} />
        </div>
      </div>
    </div>
  );
}

export default PatientDetailPage;
