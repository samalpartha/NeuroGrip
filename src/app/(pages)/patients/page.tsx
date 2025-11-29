"use client";

import { useState, useEffect } from "react";
import { PatientList } from "@/components/patients/patient-list";
import type { Patient } from "@/lib/types";
import { Users } from "lucide-react";
import { useFirestore, useUser } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import withAuth from "@/components/auth/withAuth";

function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const firestore = useFirestore();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    const patientsCollectionRef = collection(firestore, "patients");
    const q = query(patientsCollectionRef, where("therapistId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const patientsData: Patient[] = [];
      querySnapshot.forEach((doc) => {
        patientsData.push({ id: doc.id, ...doc.data() } as Patient);
      });
      setPatients(patientsData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching patients:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, user]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Manage Patients</h1>
      </div>
      {isLoading ? (
        <p>Loading patients...</p>
      ) : (
        <PatientList patients={patients} />
      )}
    </div>
  );
}

export default withAuth(PatientsPage);
