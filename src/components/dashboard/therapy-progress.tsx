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
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { GripStrengthData, TherapyHoursData } from "@/lib/types"

interface TherapyProgressProps {
  gripStrengthHistory: GripStrengthData[];
  therapyHoursHistory: TherapyHoursData[];
}

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
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gripStrengthHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis unit=" N" />
                  <Tooltip
                    cursor={{ stroke: 'hsl(var(--accent))', strokeWidth: 2, strokeDasharray: '3 3' }}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line type="monotone" dataKey="strength" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="therapyHours">
            <div className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={therapyHoursHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis unit=" hrs" />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="hours" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
