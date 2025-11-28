import { MainLayout } from '@/components/layout/main-layout';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { TherapyProgress } from '@/components/dashboard/therapy-progress';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { patients } from '@/lib/data';

export default function Home() {
  const patient = patients[0]; // Using first patient as the example user
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <WelcomeHeader name={patient.name} />
        <StatsCards 
          totalHours={patient.totalHours} 
          avgGripStrength={patient.avgGripStrength} 
          goalsCompleted={patient.goalsCompleted}
        />
        <TherapyProgress
          gripStrengthHistory={patient.gripStrengthHistory}
          therapyHoursHistory={patient.therapyHoursHistory}
        />
      </div>
    </MainLayout>
  );
}
