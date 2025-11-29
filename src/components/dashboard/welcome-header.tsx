'use client';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/firebase";

export function WelcomeHeader() {
  const { user } = useUser();
  const name = user?.displayName || 'User';

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Welcome back, {name}!</CardTitle>
        <CardDescription>
          You're making great progress. Let's keep up the momentum in today's session.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
