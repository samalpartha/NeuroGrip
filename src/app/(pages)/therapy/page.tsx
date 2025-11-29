'use client';

import { AdaptiveAssistClient } from '@/components/therapy/adaptive-assist-client';
import { GamifiedExercise } from '@/components/therapy/gamified-exercise';
import { HeartPulse } from 'lucide-react';

function TherapyPage() {
  // Dummy data, this could be fetched based on selected patient or program
  const patientCondition = 'Post-stroke recovery';
  const targetStrength = 30;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <HeartPulse className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Therapy Session</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <GamifiedExercise targetStrength={targetStrength} />
        </div>
        <div className="lg:col-span-1">
          <AdaptiveAssistClient
            patientCondition={patientCondition}
            targetStrength={targetStrength}
          />
        </div>
      </div>
    </div>
  );
}

export default TherapyPage;
