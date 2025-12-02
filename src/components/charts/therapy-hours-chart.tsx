'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TherapyHoursData {
    date: string;
    hours: number;
}

interface TherapyHoursChartProps {
    data: TherapyHoursData[];
}

export function TherapyHoursChart({ data }: TherapyHoursChartProps) {
    // Calculate cumulative hours display
    const cumulativeData = data.map((item, index) => {
        const incrementalHours = index === 0 ? item.hours : item.hours - data[index - 1].hours;
        return {
            ...item,
            incrementalHours: Math.max(0, incrementalHours),
        };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Therapy Hours Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cumulativeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                        />
                        <YAxis
                            label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip />
                        <Bar
                            dataKey="incrementalHours"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                            name="Hours Completed"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
