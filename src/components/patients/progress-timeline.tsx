'use client';

import { Patient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Calendar, Target, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface ProgressTimelineProps {
    patient: Patient;
}

interface Milestone {
    date: Date;
    title: string;
    description: string;
    type: 'achievement' | 'session' | 'goal';
    icon: typeof Trophy;
    value?: string;
}

function generateMilestones(patient: Patient): Milestone[] {
    const milestones: Milestone[] = [];
    const now = new Date();

    // Add goal completions
    if (patient.goalsCompleted > 0) {
        for (let i = 0; i < Math.min(patient.goalsCompleted, 3); i++) {
            const daysAgo = (i + 1) * 10;
            milestones.push({
                date: new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000),
                title: `Goal ${patient.goalsCompleted - i} Completed`,
                description: 'Successfully achieved rehabilitation milestone',
                type: 'goal',
                icon: Target,
                value: '🎯'
            });
        }
    }

    // Add strength improvements
    if (patient.gripStrengthHistory && patient.gripStrengthHistory.length > 1) {
        const recentHistory = patient.gripStrengthHistory.slice(-5);
        recentHistory.forEach((entry, index) => {
            if (index > 0) {
                const prevStrength = recentHistory[index - 1].strength;
                const improvement = entry.strength - prevStrength;
                if (improvement >= 2) {
                    milestones.push({
                        date: new Date(entry.date),
                        title: 'Significant Strength Gain',
                        description: `Grip strength increased by ${improvement} kg`,
                        type: 'achievement',
                        icon: TrendingUp,
                        value: `+${improvement} kg`
                    });
                }
            }
        });
    }

    // Add recent sessions
    if (patient.lastSession) {
        let lastSessionDate: Date;
        if (typeof patient.lastSession === 'object' && 'seconds' in patient.lastSession) {
            lastSessionDate = new Date((patient.lastSession as any).seconds * 1000);
        } else if (patient.lastSession instanceof Date) {
            lastSessionDate = patient.lastSession;
        } else {
            lastSessionDate = new Date();
        }

        milestones.push({
            date: lastSessionDate,
            title: 'Latest Therapy Session',
            description: 'Completed rehabilitation exercises',
            type: 'session',
            icon: Calendar,
            value: format(lastSessionDate, 'MMM d')
        });
    }

    // Add achievement for reaching 50% of target
    const progress = (patient.avgGripStrength / patient.targetStrength) * 100;
    if (progress >= 50 && progress < 75) {
        milestones.push({
            date: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
            title: 'Halfway Milestone! 🎉',
            description: 'Reached 50% of target grip strength',
            type: 'achievement',
            icon: Trophy,
            value: '50%'
        });
    }

    // Add achievement for reaching 75% of target
    if (progress >= 75) {
        milestones.push({
            date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
            title: 'Excellent Progress! 🌟',
            description: 'Reached 75% of target grip strength',
            type: 'achievement',
            icon: Trophy,
            value: '75%'
        });
    }

    // Sort by date (most recent first)
    return milestones.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 6);
}

function getMilestoneColor(type: Milestone['type']) {
    switch (type) {
        case 'achievement':
            return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
        case 'goal':
            return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
        case 'session':
            return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
    }
}

function getMilestoneIconColor(type: Milestone['type']) {
    switch (type) {
        case 'achievement':
            return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
        case 'goal':
            return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
        case 'session':
            return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
    }
}

export function ProgressTimeline({ patient }: ProgressTimelineProps) {
    const milestones = generateMilestones(patient);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-600" />
                    <CardTitle>Progress Timeline</CardTitle>
                </div>
                <CardDescription>
                    Key milestones and achievements in {patient.name}'s recovery journey
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {milestones.map((milestone, index) => {
                        const Icon = milestone.icon;
                        return (
                            <div
                                key={index}
                                className={`relative pl-8 pb-4 border-l-4 ${getMilestoneColor(milestone.type)} ${index === milestones.length - 1 ? 'border-l-transparent' : ''
                                    }`}
                            >
                                <div className={`absolute left-0 top-0 -translate-x-1/2 p-2 rounded-full ${getMilestoneIconColor(milestone.type)}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-semibold text-sm">{milestone.title}</h4>
                                        {milestone.value && (
                                            <Badge variant="secondary" className="text-xs">
                                                {milestone.value}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {milestone.description}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {format(milestone.date, 'MMM d, yyyy')}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {milestones.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No milestones yet. Keep working towards your goals!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
