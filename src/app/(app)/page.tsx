'use client';

import { useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-8">
      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Welcome, {user?.displayName || 'Therapist'}!</CardTitle>
          <CardDescription>
            This is your central hub for managing patients and tracking their progress.
          </CardDescription>
        </CardHeader>
      </Card>
       <Card>
        <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Core patient management is now active.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>You can manage your patients by clicking the "Patients" link in the sidebar, or by clicking <Link href="/patients" className='underline text-primary'>here</Link>.</p>
            <p className='mt-4'>Other features are temporarily disabled and will be re-enabled shortly.</p>
        </CardContent>
       </Card>
    </div>
  );
}

export default DashboardPage;
