'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { TherapyOverviewChart } from '@/components/dashboard/therapy-overview-chart';
import { collection, query, where } from '@/lib/db';
import type { Patient } from '@/lib/types';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const patientsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'patients'), where('therapistId', '==', user.uid));
  }, [firestore, user]);

  const { data: patients, isLoading } = useCollection<Patient>(patientsQuery);

  // Calculate dashboard statistics
  const stats = patients ? {
    totalPatients: patients.length,
    activePatients: patients.filter(p => {
      if (!p.lastSession) return false;

      // Handle different lastSession formats
      let lastSessionDate: Date;
      if (typeof p.lastSession === 'object' && 'toDate' in p.lastSession) {
        lastSessionDate = p.lastSession.toDate();
      } else if (typeof p.lastSession === 'object' && 'seconds' in p.lastSession) {
        // Firestore Timestamp object
        lastSessionDate = new Date((p.lastSession as any).seconds * 1000);
      } else if (p.lastSession instanceof Date) {
        lastSessionDate = p.lastSession;
      } else {
        return false;
      }

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastSessionDate > weekAgo;
    }).length,
    avgProgress: Math.round(
      patients.reduce((sum, p) => {
        const progress = (p.avgGripStrength / p.targetStrength) * 100;
        return sum + Math.min(progress, 100);
      }, 0) / patients.length
    ),
    totalHours: patients.reduce((sum, p) => sum + (p.totalHours || 0), 0),
    goalsCompleted: patients.reduce((sum, p) => sum + (p.goalsCompleted || 0), 0),
  } : { totalPatients: 0, activePatients: 0, avgProgress: 0, totalHours: 0, goalsCompleted: 0 };

  return (
    <div className="flex flex-col gap-8">
      <Card className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border-violet-500/20">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Welcome back, {user?.displayName || 'Therapist'}!</CardTitle>
          <CardDescription>
            Here's an overview of your patients' progress and recent activity.
          </CardDescription>
        </CardHeader>
      </Card>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          <StatsCards {...stats} />

          <TherapyOverviewChart patients={patients || []} />

          <div className="grid gap-6 md:grid-cols-2">
            <RecentActivity />

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/patients" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold">Manage Patients</h3>
                  <p className="text-sm text-muted-foreground">View and update patient records</p>
                </Link>
                <Link href="/settings" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure your preferences</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
