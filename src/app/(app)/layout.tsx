'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // Check for session in localStorage
    const session = localStorage.getItem('neurogrip_session');

    if (!session) {
      router.replace('/login');
    } else {
      setIsCheckingSession(false);
    }
  }, [router]);

  if (isUserLoading || isCheckingSession) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
