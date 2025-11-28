"use client";

import { useState } from "react";
import { PatientList } from "@/components/patients/patient-list";
import { patients as initialPatients } from "@/lib/data";
import type { Patient } from "@/lib/types";
import { Users } from "lucide-react";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  const handleAddPatient = (newPatient: Patient) => {
    setPatients((prevPatients) => [newPatient, ...prevPatients]);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Manage Patients</h1>
      </div>
      <PatientList patients={patients} onAddPatient={handleAddPatient} />
    </div>
  );
}
