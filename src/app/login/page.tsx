'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if already logged in
        const session = localStorage.getItem('neurogrip_session');
        if (session) {
            router.push('/');
        }
    }, [router]);

    const handleDemoLogin = () => {
        localStorage.setItem('neurogrip_session', 'demo-therapist');
        localStorage.setItem('neurogrip_user', JSON.stringify({
            name: 'Demo Therapist',
            email: 'demo@neurogrip.com',
            role: 'therapist'
        }));
        router.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
                {/* Branding Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                            <BrainCircuit className="h-12 w-12 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                NeuroGrip
                            </h1>
                            <p className="text-muted-foreground">Adaptive Hand Rehabilitation</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">
                            Transform Patient Recovery with AI-Powered Insights
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Track progress, generate personalized exercise recommendations, and manage patient care with our comprehensive rehabilitation platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
                            <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-sm">Real-time Analytics</h3>
                                <p className="text-xs text-muted-foreground">Track patient progress</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
                            <Sparkles className="h-5 w-5 text-purple-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-sm">AI Recommendations</h3>
                                <p className="text-xs text-muted-foreground">Personalized exercises</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur col-span-2">
                            <Users className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-sm">Patient Management</h3>
                                <p className="text-xs text-muted-foreground">Comprehensive care tracking with voice notes and printable reports</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login Card */}
                <Card className="shadow-2xl border-2">
                    <CardHeader className="text-center space-y-4">
                        <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                        <CardDescription className="text-base">
                            Access your rehabilitation dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Button
                            onClick={handleDemoLogin}
                            className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                        >
                            <Sparkles className="mr-2 h-5 w-5" />
                            Enter Demo Dashboard
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Demo Features
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span>5 Sample patients with full history</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span>AI-powered exercise recommendations</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span>Progress timeline & milestones</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span>Voice notes & printable reports</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span>Dark mode support</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <p className="text-xs text-center text-muted-foreground">
                                This is a demonstration platform showcasing advanced rehabilitation management features
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
