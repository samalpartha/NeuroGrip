'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { TherapyProgress } from '@/components/dashboard/therapy-progress';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Patient } from '@/lib/types';
import { useMemo } from 'react';

function Home() {
  const { user } = useUser();
  const firestore = useFirestore();

  const patientsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'patients'), where('therapistId', '==', user.uid));
  }, [firestore, user]);

  const { data: patients, isLoading } = useCollection<Patient>(patientsQuery);

  const stats = useMemo(() => {
    if (!patients || patients.length === 0) {
      return { totalHours: 0, avgGripStrength: 0, goalsCompleted: 0 };
    }
    const totalHours = patients.reduce((sum, p) => sum + (p.totalHours || 0), 0);
    const avgGripStrength = patients.reduce((sum, p) => sum + (p.avgGripStrength || 0), 0) / patients.length;
    const goalsCompleted = patients.reduce((sum, p) => sum + (p.goalsCompleted || 0), 0);
    return { totalHours, avgGripStrength, goalsCompleted };
  }, [patients]);
  
  const allGripStrengthHistory = useMemo(() => {
    if (!patients) return [];
    return patients.flatMap(p => p.gripStrengthHistory || []);
  }, [patients]);

  const allTherapyHoursHistory = useMemo(() => {
    if (!patients) return [];
    return patients.flatMap(p => p.therapyHoursHistory || []);
  }, [patients]);


  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <WelcomeHeader />
        {isLoading ? (
          <div>Loading stats...</div>
        ) : (
          <>
            <StatsCards 
              totalHours={stats.totalHours} 
              avgGripStrength={stats.avgGripStrength} 
              goalsCompleted={stats.goalsCompleted}
            />
            <TherapyProgress
              gripStrengthHistory={allGripStrengthHistory}
              therapyHoursHistory={allTherapyHoursHistory}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Home;
