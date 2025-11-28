import { PatientList } from "@/components/patients/patient-list";
import { patients } from "@/lib/data";
import { Users } from "lucide-react";

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Manage Patients</h1>
      </div>
      <PatientList patients={patients} />
    </div>
  );
}
