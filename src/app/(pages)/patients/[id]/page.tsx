
"use client";

import { PatientDetails } from "@/components/patients/patient-details";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { notFound } from "next/navigation";
import { User } from "lucide-react";
import type { Patient } from "@/lib/types";
import withAuth from "@/components/auth/withAuth";

<<<<<<< HEAD
export async function generateStaticParams() {
  return patients.map((patient) => ({
    id: patient.id,
  }));
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = patients.find((p) => p.id === id);
=======
function PatientDetailPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  
  const patientDocRef = useMemoFirebase(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, "patients", params.id);
  }, [firestore, params.id]);

  const { data: patient, isLoading } = useDoc<Patient>(patientDocRef);

  if (isLoading) {
    return <div>Loading patient details...</div>;
  }
>>>>>>> 4cbf0a3 (I see this error with the app, reported by NextJS, please fix it. The er)

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
