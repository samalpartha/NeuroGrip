import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Activity, Target, Timer } from "lucide-react"

interface StatsCardsProps {
  totalHours: number;
  avgGripStrength: number;
  goalsCompleted: number;
}

export function StatsCards({ totalHours, avgGripStrength, goalsCompleted }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Therapy Hours",
      value: `${totalHours} hrs`,
      icon: Timer,
      description: "Total time invested in recovery",
    },
    {
      title: "Avg. Grip Strength",
      value: `${avgGripStrength} N`,
      icon: Activity,
      description: "Average force this month",
    },
    {
      title: "Goals Completed",
      value: goalsCompleted,
      icon: Target,
      description: "Strength targets achieved",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
