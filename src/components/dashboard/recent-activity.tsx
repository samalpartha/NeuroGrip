'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, User, Activity } from 'lucide-react';

interface ActivityItem {
    id: string;
    type: 'session' | 'milestone' | 'alert';
    patientName: string;
    description: string;
    time: string;
    status?: 'success' | 'warning' | 'info';
}

const mockActivities: ActivityItem[] = [
    {
        id: '1',
        type: 'session',
        patientName: 'Sarah Johnson',
        description: 'Completed therapy session',
        time: 'Just now',
        status: 'success',
    },
    {
        id: '2',
        type: 'milestone',
        patientName: 'Emma Thompson',
        description: 'Reached 18N grip strength milestone',
        time: '2 hours ago',
        status: 'success',
    },
    {
        id: '3',
        type: 'alert',
        patientName: 'Maria Rodriguez',
        description: 'No session in 7 days',
        time: '1 day ago',
        status: 'warning',
    },
    {
        id: '4',
        type: 'session',
        patientName: 'Robert Kim',
        description: 'Completed therapy session',
        time: '3 days ago',
        status: 'success',
    },
    {
        id: '5',
        type: 'milestone',
        patientName: 'James Chen',
        description: 'Completed 3 treatment goals',
        time: '1 week ago',
        status: 'success',
    },
];

function getActivityIcon(type: string) {
    switch (type) {
        case 'session':
            return <CalendarDays className="h-4 w-4" />;
        case 'milestone':
            return <Activity className="h-4 w-4" />;
        case 'alert':
            return <User className="h-4 w-4" />;
        default:
            return <Activity className="h-4 w-4" />;
    }
}

function getStatusVariant(status?: string) {
    switch (status) {
        case 'success':
            return 'default';
        case 'warning':
            return 'destructive';
        case 'info':
            return 'secondary';
        default:
            return 'outline';
    }
}

export function RecentActivity() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockActivities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0 transition-all hover:bg-accent/50 -mx-2 px-2 py-2 rounded-lg"
                        >
                            <div className={`mt-1 p-2 rounded-full transition-transform hover:scale-110 ${activity.status === 'success' ? 'bg-green-100 text-green-600' :
                                activity.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                                    'bg-blue-100 text-blue-600'
                                }`}>
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium leading-none">
                                        {activity.patientName}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {activity.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
