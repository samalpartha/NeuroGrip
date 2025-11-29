"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";

function AboutPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Info className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">About NeuroGrip</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              NeuroGrip is dedicated to revolutionizing hand rehabilitation through technology. We believe that recovery should be engaging, personalized, and accessible. Our adaptive robotic glove, combined with our intelligent software platform, empowers patients to take an active role in their therapy and achieve better outcomes.
            </p>
            <p>
              Our mission is to provide therapists with powerful tools to monitor progress, customize treatment plans, and deliver the best possible care. By gamifying exercises and providing real-time feedback, we make the path to recovery not just effective, but also motivating.
            </p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-0">
               <Image
                  src="https://picsum.photos/seed/rehab/600/400"
                  alt="Patient using therapy glove"
                  width={600}
                  height={400}
                  className="rounded-t-lg object-cover"
                  data-ai-hint="rehabilitation therapy"
                />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">For Patients</h3>
                <p className="text-muted-foreground">
                  Take control of your recovery with fun, game-like exercises. Track your progress, celebrate your achievements, and get stronger every day with a therapy plan designed just for you.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
             <CardContent className="p-0">
               <Image
                  src="https://picsum.photos/seed/therapist/600/400"
                  alt="Therapist with patient"
                  width={600}
                  height={400}
                  className="rounded-t-lg object-cover"
                  data-ai-hint="therapist doctor"
                />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">For Therapists</h3>
                <p className="text-muted-foreground">
                  Leverage AI-driven insights to create personalized therapy programs. Monitor patient performance, adjust goals in real-time, and spend more time providing hands-on care.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

export default AboutPage;
