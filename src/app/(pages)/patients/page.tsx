
"use client";

import { useState, useEffect, useMemo } from "react";
import { PatientList } from "@/components/patients/patient-list";
import type { Patient } from "@/lib/types";
import { Users } from "lucide-react";
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import withAuth from "@/components/auth/withAuth";

function PatientsPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  const patientsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, "patients"), where("therapistId", "==", user.uid));
  }, [firestore, user]);

  const { data: patients, isLoading } = useCollection<Patient>(patientsQuery);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Manage Patients</h1>
      </div>
      {isLoading ? (
        <p>Loading patients...</p>
      ) : (
        <PatientList patients={patients || []} />
      )}
    </div>
  );
}

export default withAuth(PatientsPage);
