"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { GripStrengthData, TherapyHoursData } from "@/lib/types"

interface TherapyProgressProps {
  gripStrengthHistory: GripStrengthData[];
  therapyHoursHistory: TherapyHoursData[];
}

const chartConfig = {
  strength: {
    label: "Grip Strength (N)",
    color: "hsl(var(--primary))",
  },
  hours: {
    label: "Therapy Hours",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function TherapyProgress({ gripStrengthHistory, therapyHoursHistory }: TherapyProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Therapy Progress</CardTitle>
        <CardDescription>A summary of your recovery journey over the last 5 weeks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gripStrength">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gripStrength">Grip Strength</TabsTrigger>
            <TabsTrigger value="therapyHours">Therapy Hours</TabsTrigger>
          </TabsList>
          <TabsContent value="gripStrength">
            <ChartContainer config={chartConfig} className="h-[300px] w-full pt-4">
              <LineChart
                accessibilityLayer
                data={gripStrengthHistory}
                margin={{
                  top: 5,
                  right: 20,
                  left: -10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis unit=" N" />
                <ChartTooltip
                  cursor={{ stroke: 'hsl(var(--accent))', strokeWidth: 2, strokeDasharray: '3 3' }}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Line type="monotone" dataKey="strength" stroke="var(--color-strength)" strokeWidth={2} dot={{ r: 4, fill: 'var(--color-strength)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="therapyHours">
            <ChartContainer config={chartConfig} className="h-[300px] w-full pt-4">
              <BarChart accessibilityLayer data={therapyHoursHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis unit=" hrs" />
                  <ChartTooltip
                      cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}
                      content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
