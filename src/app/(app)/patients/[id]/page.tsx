'use client';

import { PatientDetails } from '@/components/patients/patient-details';
import { ExerciseRecommendations } from '@/components/patients/exercise-recommendations';
import { ProgressTimeline } from '@/components/patients/progress-timeline';
import { useFirestore, useUser } from '@/firebase';
import { doc } from '@/lib/db';
import { notFound, useRouter } from 'next/navigation';
import { Loader2, User } from 'lucide-react';
import type { Patient } from '@/lib/types';
import { useEffect, use, useState } from 'react';
import { onSnapshot } from '@/lib/db';

function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const firestore = useFirestore();
  const { user } = useUser();
  const router = useRouter();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !id) {
      setPatient(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const patientDocRef = doc(firestore, 'patients', id);

    const unsubscribe = onSnapshot(
      patientDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setPatient({ ...(snapshot.data() as Patient), id: snapshot.id });
        } else {
          setPatient(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('[PatientDetailPage] Error:', error);
        setPatient(null);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [firestore, id]);


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
