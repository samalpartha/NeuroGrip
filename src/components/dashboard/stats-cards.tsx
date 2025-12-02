'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Clock, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function StatCard({ title, value, icon, trend, subtitle }: StatCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold transition-all duration-300">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            <span>{Math.abs(trend.value)}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  totalPatients: number;
  activePatients: number;
  avgProgress: number;
  totalHours: number;
  goalsCompleted: number;
}

export function StatsCards({ totalPatients, activePatients, avgProgress, totalHours, goalsCompleted }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Patients"
        value={totalPatients}
        icon={<Users className="h-4 w-4" />}
        subtitle={`${activePatients} active this week`}
      />
      <StatCard
        title="Average Progress"
        value={`${avgProgress}%`}
        icon={<Activity className="h-4 w-4" />}
        subtitle="Across all patients"
      />
      <StatCard
        title="Total Therapy Hours"
        value={totalHours}
        icon={<Clock className="h-4 w-4" />}
        subtitle="Cumulative hours"
      />
      <StatCard
        title="Goals Completed"
        value={goalsCompleted}
        icon={<Target className="h-4 w-4" />}
        subtitle="Total achievements"
      />
    </div>
  );
}
