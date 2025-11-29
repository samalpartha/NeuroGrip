'use client';

import { StatsCards } from '@/components/dashboard/stats-cards';
import { TherapyProgress } from '@/components/dashboard/therapy-progress';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Patient } from '@/lib/types';
import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';

function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const patientsQuery = useMemoFirebase(() => {
    // IMPORTANT: Only construct the query if we have a user and firestore instance.
    // This prevents queries with a null UID, which security rules would block.
    if (!user || !firestore) {
      return null;
    }
    return query(collection(firestore, 'patients'), where('therapistId', '==', user.uid));
  }, [firestore, user]);

  const { data: patients, isLoading } = useCollection<Patient>(patientsQuery);

  const stats = useMemo(() => {
    if (!patients || patients.length === 0) {
      return { totalHours: 0, avgGripStrength: 0, goalsCompleted: 0 };
    }
    const totalHours = patients.reduce((sum, p) => sum + (p.totalHours || 0), 0);
    const avgGripStrength = patients.length > 0 ? patients.reduce((sum, p) => sum + (p.avgGripStrength || 0), 0) / patients.length : 0;
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

  // The isLoading state from useCollection will be true until the query is run and data is fetched.
  // We also check if patients is null because the query itself is null until the user is loaded.
  const isContentLoading = isLoading || patients === null;

  return (
    <div className="flex flex-col gap-8">
      <WelcomeHeader />
      {isContentLoading ? (
        <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
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
  );
}

export default DashboardPage;
