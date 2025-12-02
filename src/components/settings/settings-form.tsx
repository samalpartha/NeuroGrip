"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useUser, useFirestore } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  enableNotifications: z.boolean(),
  darkMode: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function SettingsForm() {
  const { toast } = useToast();
  const { user, auth } = useUser();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, setTheme } = useTheme();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      enableNotifications: true,
      darkMode: false,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || "",
        email: user.email || "",
        enableNotifications: true,
        darkMode: theme === 'dark',
      });
    }
  }, [user, form, theme]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user || !firestore || !auth) return;
    setIsSubmitting(true);

    try {
      // Update profile in Firebase Auth
      if (user.displayName !== data.name) {
        await updateProfile(user, { displayName: data.name });
      }

      // Update user document in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, { name: data.name });

      // Update theme
      setTheme(data.darkMode ? 'dark' : 'light');

      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated.",
      });
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: "Error",
        description: "Failed to save settings.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <Separator />
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your app experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="enableNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Notifications</FormLabel>
                    <FormDescription>Receive updates on your progress and session reminders.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="darkMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Dark Mode</FormLabel>
                    <FormDescription>Enable a darker color theme for the interface.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        // Optional: Instant preview
                        setTheme(checked ? 'dark' : 'light');
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Preferences
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
