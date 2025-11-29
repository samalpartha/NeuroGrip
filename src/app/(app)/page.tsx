'use client';

import { useUser } from '@/firebase';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-8">
      <WelcomeHeader />
       <Card>
        <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Core functionality has been rebuilt for stability.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>The patient management feature is now active. Other features are temporarily disabled and will be re-enabled shortly.</p>
            <p className='mt-4'>You can manage your patients by clicking <Link href="/patients" className='underline text-primary'>here</Link>.</p>
        </CardContent>
       </Card>
    </div>
  );
}

export default DashboardPage;
