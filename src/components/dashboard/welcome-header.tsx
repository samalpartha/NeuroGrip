import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface WelcomeHeaderProps {
  name: string
}

export function WelcomeHeader({ name }: WelcomeHeaderProps) {
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
