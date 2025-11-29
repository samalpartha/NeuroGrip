import { PatientDetails } from "@/components/patients/patient-details";
import { patients } from "@/lib/data";
import { notFound } from "next/navigation";
import { User } from "lucide-react";

export async function generateStaticParams() {
  return patients.map((patient) => ({
    id: patient.id,
  }));
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = patients.find((p) => p.id === params.id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Patient Profile</h1>
      </div>
      <PatientDetails patient={patient} />
    </div>
  );
}
