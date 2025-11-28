import { AdaptiveAssistClient } from "@/components/therapy/adaptive-assist-client";
import { GamifiedExercise } from "@/components/therapy/gamified-exercise";
import { patients } from "@/lib/data";
import { HeartPulse } from "lucide-react";

export default function TherapyPage() {
  const patient = patients[0]; // Using the first patient for the demo

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <HeartPulse className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Therapy Session</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <GamifiedExercise targetStrength={patient.targetStrength} />
        </div>
        <div className="lg:col-span-1">
          <AdaptiveAssistClient
            patientCondition={patient.condition}
            targetStrength={patient.targetStrength}
          />
        </div>
      </div>
    </div>
  );
}
