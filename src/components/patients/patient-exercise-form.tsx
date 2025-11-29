"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Patient } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  targetStrength: z.coerce.number().min(0, "Must be a positive number."),
  therapistNotes: z.string().min(10, "Notes must be at least 10 characters.").max(500, "Notes cannot exceed 500 characters."),
});

type FormValues = z.infer<typeof formSchema>;

interface PatientExerciseFormProps {
  patient: Patient;
}

export function PatientExerciseForm({ patient }: PatientExerciseFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetStrength: patient.targetStrength || 20,
      therapistNotes: patient.therapistNotes || '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!firestore || !patient.id) return;
    setIsSubmitting(true);

    try {
      const patientDocRef = doc(firestore, 'patients', patient.id);
      await updateDoc(patientDocRef, data);
      
      toast({
        title: "Patient Updated",
        description: `${patient.name}'s exercise plan has been successfully updated.`,
      });
    } catch (error: any) {
        toast({
        variant: "destructive",
        title: "Failed to Update Patient",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Customize Program</CardTitle>
            <CardDescription>Adjust therapy goals and notes for {patient.name}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="targetStrength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Grip Strength (N)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="therapistNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Therapist Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
