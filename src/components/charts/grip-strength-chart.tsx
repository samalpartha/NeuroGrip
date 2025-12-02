'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface GripStrengthData {
    date: string;
    strength: number;
}

interface GripStrengthChartProps {
    data: GripStrengthData[];
    targetStrength: number;
}

export function GripStrengthChart({ data, targetStrength }: GripStrengthChartProps) {
    // Add target line to chart data
    const chartData = data.map(item => ({
        ...item,
        target: targetStrength,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Grip Strength Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                        />
                        <YAxis
                            label={{ value: 'Strength (N)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="strength"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            name="Actual Strength"
                        />
                        <Line
                            type="monotone"
                            dataKey="target"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            name="Target"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
