'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Patient } from '@/lib/types';
import { useMemo } from 'react';

interface TherapyOverviewChartProps {
    patients: Patient[];
}

export function TherapyOverviewChart({ patients }: TherapyOverviewChartProps) {
    // Aggregate data from all patients
    const chartData = useMemo(() => {
        if (!patients || patients.length === 0) return [];

        // Collect all unique dates from all patients
        const dateMap = new Map<string, { gripStrength: number[], therapyHours: number[] }>();

        patients.forEach(patient => {
            // Add grip strength data
            patient.gripStrengthHistory?.forEach(entry => {
                if (!dateMap.has(entry.date)) {
                    dateMap.set(entry.date, { gripStrength: [], therapyHours: [] });
                }
                dateMap.get(entry.date)!.gripStrength.push(entry.strength);
            });

            // Add therapy hours data
            patient.therapyHoursHistory?.forEach(entry => {
                if (!dateMap.has(entry.date)) {
                    dateMap.set(entry.date, { gripStrength: [], therapyHours: [] });
                }
                dateMap.get(entry.date)!.therapyHours.push(entry.hours);
            });
        });

        // Convert to array and calculate averages
        const data = Array.from(dateMap.entries())
            .map(([date, values]) => ({
                date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                avgGripStrength: values.gripStrength.length > 0
                    ? Math.round(values.gripStrength.reduce((a, b) => a + b, 0) / values.gripStrength.length)
                    : 0,
                totalHours: values.therapyHours.length > 0
                    ? Math.round(values.therapyHours.reduce((a, b) => a + b, 0))
                    : 0,
            }))
            .sort((a, b) => {
                // Sort by date
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });

        return data;
    }, [patients]);

    if (chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Therapy Overview</CardTitle>
                    <CardDescription>No therapy data available</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Therapy Overview</CardTitle>
                <CardDescription>
                    Average grip strength and total therapy hours across all patients
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="date"
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                            yAxisId="left"
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            label={{ value: 'Grip Strength (kg)', angle: -90, position: 'insideLeft' }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            label={{ value: 'Total Hours', angle: 90, position: 'insideRight' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '6px',
                            }}
                        />
                        <Legend />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="avgGripStrength"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            name="Avg Grip Strength"
                            dot={{ fill: 'hsl(var(--primary))' }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="totalHours"
                            stroke="hsl(var(--chart-2))"
                            strokeWidth={2}
                            name="Total Hours"
                            dot={{ fill: 'hsl(var(--chart-2))' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
