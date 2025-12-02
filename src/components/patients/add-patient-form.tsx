'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { collection, addDoc, serverTimestamp } from '@/lib/db';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  age: z.coerce.number().min(1, 'Age must be a positive number.'),
  condition: z.string().min(3, 'Condition must be at least 3 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export function AddPatientForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 0, // Initialize with 0 or a valid number
      condition: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to add a patient.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const patientsCollectionRef = collection(firestore, 'patients');

      await addDoc(patientsCollectionRef, {
        ...data,
        therapistId: user.uid,
        avatarUrl: `https://picsum.photos/seed/${data.name.split(' ')[0]}/100/100`,
        avatarHint: 'person',
        lastSession: serverTimestamp(),
        therapistNotes: 'Newly added patient.',
        totalHours: 0,
        avgGripStrength: 0,
        goalsCompleted: 0,
        targetStrength: 20,
        gripStrengthHistory: [],
        therapyHoursHistory: [],
      });

      toast({
        title: 'Patient Added',
        description: `${data.name} has been successfully added to your patient list.`,
      });
      setOpen(false);
      form.reset();

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to Add Patient',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Enter the details for the new patient below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="45" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <Input placeholder="Post-stroke recovery" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Patient
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
