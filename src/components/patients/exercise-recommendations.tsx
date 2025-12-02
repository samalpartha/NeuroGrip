'use client';

import { Patient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Dumbbell, Hand, Timer, TrendingUp } from 'lucide-react';

interface ExerciseRecommendationsProps {
    patient: Patient;
}

interface Exercise {
    name: string;
    description: string;
    duration: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    icon: typeof Dumbbell;
    reason: string;
}

function getRecommendations(patient: Patient): Exercise[] {
    const exercises: Exercise[] = [];
    const gripStrength = patient.avgGripStrength;
    const targetStrength = patient.targetStrength;
    const progress = (gripStrength / targetStrength) * 100;

    // Beginner exercises (grip strength < 15)
    if (gripStrength < 15) {
        exercises.push({
            name: 'Gentle Squeeze Therapy',
            description: 'Squeeze a soft foam ball gently for 5 seconds, release slowly. Focus on controlled movements.',
            duration: '3 sets of 10 reps',
            difficulty: 'Easy',
            icon: Hand,
            reason: 'Low current grip strength - building foundation'
        });
        exercises.push({
            name: 'Finger Flexion Stretches',
            description: 'Slowly curl fingers into a fist, hold for 3 seconds, then extend fully. Repeat with controlled breathing.',
            duration: '2 sets of 15 reps',
            difficulty: 'Easy',
            icon: Hand,
            reason: 'Improving flexibility and basic motor control'
        });
    }

    // Intermediate exercises (grip strength 15-25)
    if (gripStrength >= 15 && gripStrength < 25) {
        exercises.push({
            name: 'Resistance Band Training',
            description: 'Use a light resistance band to perform finger extensions and flexions. Gradually increase resistance.',
            duration: '4 sets of 12 reps',
            difficulty: 'Medium',
            icon: Dumbbell,
            reason: 'Building strength progressively'
        });
        exercises.push({
            name: 'Grip Strengthener Exercises',
            description: 'Use an adjustable grip strengthener at 50-60% max capacity. Focus on slow, controlled squeezes.',
            duration: '3 sets of 10 reps',
            difficulty: 'Medium',
            icon: TrendingUp,
            reason: 'Approaching target strength - increasing resistance'
        });
    }

    // Advanced exercises (grip strength >= 25)
    if (gripStrength >= 25) {
        exercises.push({
            name: 'Advanced Grip Training',
            description: 'Use grip strengthener at 70-80% max capacity with varied grip positions for comprehensive strength.',
            duration: '4 sets of 8 reps',
            difficulty: 'Hard',
            icon: Dumbbell,
            reason: 'Maintaining and exceeding target strength'
        });
        exercises.push({
            name: 'Endurance Hold Training',
            description: 'Hold grip strengthener at 60% capacity for extended periods. Build muscular endurance.',
            duration: '3 sets of 30 seconds',
            difficulty: 'Hard',
            icon: Timer,
            reason: 'Building endurance for daily activities'
        });
    }

    // Condition-specific recommendations
    if (patient.condition.toLowerCase().includes('stroke')) {
        exercises.push({
            name: 'Mirror Therapy Exercises',
            description: 'Perform exercises while watching the unaffected hand in a mirror to stimulate neural pathways.',
            duration: '10 minutes daily',
            difficulty: 'Easy',
            icon: Hand,
            reason: 'Stroke recovery - neural pathway activation'
        });
    }

    if (patient.condition.toLowerCase().includes('carpal tunnel')) {
        exercises.push({
            name: 'Wrist Mobility Exercises',
            description: 'Gentle wrist rotations and flexion/extension movements to maintain range of motion.',
            duration: '5 minutes, 3x daily',
            difficulty: 'Easy',
            icon: Hand,
            reason: 'Carpal tunnel - maintaining wrist mobility'
        });
    }

    // Return top 4 most relevant exercises
    return exercises.slice(0, 4);
}

function getDifficultyColor(difficulty: Exercise['difficulty']) {
    switch (difficulty) {
        case 'Easy':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'Hard':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
}

export function ExerciseRecommendations({ patient }: ExerciseRecommendationsProps) {
    const recommendations = getRecommendations(patient);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <CardTitle>AI Exercise Recommendations</CardTitle>
                </div>
                <CardDescription>
                    Personalized exercises based on current progress and condition
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {recommendations.map((exercise, index) => {
                    const Icon = exercise.icon;
                    return (
                        <div
                            key={index}
                            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-semibold">{exercise.name}</h4>
                                        <Badge className={getDifficultyColor(exercise.difficulty)}>
                                            {exercise.difficulty}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {exercise.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1">
                                            <Timer className="h-3 w-3" />
                                            <span>{exercise.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Sparkles className="h-3 w-3" />
                                            <span>{exercise.reason}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="pt-2 text-xs text-center text-muted-foreground">
                    Recommendations update automatically based on patient progress
                </div>
            </CardContent>
        </Card>
    );
}
