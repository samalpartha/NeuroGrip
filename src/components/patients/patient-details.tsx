import type { Patient } from "@/lib/types";
import { TherapyProgress } from "@/components/dashboard/therapy-progress";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { VoiceNotes } from "./voice-notes";
import { PatientExerciseForm } from "./patient-exercise-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PatientDetailsProps {
  patient: Patient;
}
export function PatientDetails({ patient }: PatientDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1 flex flex-col gap-8">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={patient.avatarUrl} alt={patient.name} data-ai-hint={patient.avatarHint} />
              <AvatarFallback className="text-3xl">
                {patient.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{patient.name}</CardTitle>
            <CardDescription>{patient.age} years old • {patient.condition}</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <Button variant="outline" className="w-full" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
          </CardContent>
        </Card>
        <PatientExerciseForm patient={patient} />
        <VoiceNotes />
      </div>
      <div className="lg:col-span-2">
        <TherapyProgress
          gripStrengthHistory={patient.gripStrengthHistory}
          therapyHoursHistory={patient.therapyHoursHistory}
        />
      </div>
    </div>
  );
}
