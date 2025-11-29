"use client";

import { PatientDetails } from "@/components/patients/patient-details";
import { useDoc, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { notFound } from "next/navigation";
import { User } from "lucide-react";
import type { Patient } from "@/lib/types";
import withAuth from "@/components/auth/withAuth";

function PatientDetailPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const patientDocRef = doc(firestore, "patients", params.id);
  const { data: patient, isLoading } = useDoc<Patient>(patientDocRef);

  if (isLoading) {
    return <div>Loading patient details...</div>;
  }

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

export default withAuth(PatientDetailPage);
