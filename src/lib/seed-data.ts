import { db } from './local-db';
import { Timestamp } from './db';

export interface SeedPatient {
    name: string;
    age: number;
    condition: string;
    therapistId: string;
    avatarUrl: string;
    avatarHint: string;
    lastSession: Timestamp;
    therapistNotes: string;
    totalHours: number;
    avgGripStrength: number;
    goalsCompleted: number;
    targetStrength: number;
    gripStrengthHistory: Array<{ date: string; strength: number }>;
    therapyHoursHistory: Array<{ date: string; hours: number }>;
}

export function generateSamplePatients(therapistId: string): SeedPatient[] {
    const now = new Date();
    const getDateDaysAgo = (days: number) => {
        const date = new Date(now);
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    };

    return [
        {
            name: 'Emma Thompson',
            age: 68,
            condition: 'Post-stroke recovery (Right hemisphere)',
            therapistId,
            avatarUrl: 'https://picsum.photos/seed/emma/100/100',
            avatarHint: 'person',
            lastSession: Timestamp.fromDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
            therapistNotes: 'Excellent progress. Showing consistent improvement in fine motor control. Continue current exercise regimen.',
            totalHours: 42,
            avgGripStrength: 18,
            goalsCompleted: 7,
            targetStrength: 25,
            gripStrengthHistory: [
                { date: getDateDaysAgo(60), strength: 8 },
                { date: getDateDaysAgo(50), strength: 10 },
                { date: getDateDaysAgo(40), strength: 12 },
                { date: getDateDaysAgo(30), strength: 15 },
                { date: getDateDaysAgo(20), strength: 16 },
                { date: getDateDaysAgo(10), strength: 18 },
                { date: getDateDaysAgo(2), strength: 18 },
            ],
            therapyHoursHistory: [
                { date: getDateDaysAgo(60), hours: 2 },
                { date: getDateDaysAgo(50), hours: 4 },
                { date: getDateDaysAgo(40), hours: 6 },
                { date: getDateDaysAgo(30), hours: 8 },
                { date: getDateDaysAgo(20), hours: 10 },
                { date: getDateDaysAgo(10), hours: 12 },
                { date: getDateDaysAgo(2), hours: 15 },
            ],
        },
        {
            name: 'James Chen',
            age: 45,
            condition: 'Carpal tunnel syndrome recovery',
            therapistId,
            avatarUrl: 'https://picsum.photos/seed/james/100/100',
            avatarHint: 'person',
            lastSession: Timestamp.fromDate(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
            therapistNotes: 'Recent surgery patient. Focus on gentle stretching and gradual strength building. Monitor for pain.',
            totalHours: 18,
            avgGripStrength: 12,
            goalsCompleted: 3,
            targetStrength: 22,
            gripStrengthHistory: [
                { date: getDateDaysAgo(30), strength: 6 },
                { date: getDateDaysAgo(25), strength: 7 },
                { date: getDateDaysAgo(20), strength: 9 },
                { date: getDateDaysAgo(15), strength: 10 },
                { date: getDateDaysAgo(10), strength: 11 },
                { date: getDateDaysAgo(5), strength: 12 },
                { date: getDateDaysAgo(1), strength: 12 },
            ],
            therapyHoursHistory: [
                { date: getDateDaysAgo(30), hours: 1 },
                { date: getDateDaysAgo(25), hours: 3 },
                { date: getDateDaysAgo(20), hours: 6 },
                { date: getDateDaysAgo(15), hours: 9 },
                { date: getDateDaysAgo(10), hours: 12 },
                { date: getDateDaysAgo(5), hours: 15 },
                { date: getDateDaysAgo(1), hours: 18 },
            ],
        },
        {
            name: 'Maria Rodriguez',
            age: 52,
            condition: 'Rheumatoid arthritis management',
            therapistId,
            avatarUrl: 'https://picsum.photos/seed/maria/100/100',
            avatarHint: 'person',
            lastSession: Timestamp.fromDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
            therapistNotes: 'Long-term patient. Needs regular check-ins to maintain flexibility. Adjust intensity based on inflammation levels.',
            totalHours: 156,
            avgGripStrength: 14,
            goalsCompleted: 18,
            targetStrength: 18,
            gripStrengthHistory: [
                { date: getDateDaysAgo(90), strength: 10 },
                { date: getDateDaysAgo(75), strength: 11 },
                { date: getDateDaysAgo(60), strength: 12 },
                { date: getDateDaysAgo(45), strength: 13 },
                { date: getDateDaysAgo(30), strength: 14 },
                { date: getDateDaysAgo(15), strength: 14 },
                { date: getDateDaysAgo(7), strength: 14 },
            ],
            therapyHoursHistory: [
                { date: getDateDaysAgo(90), hours: 30 },
                { date: getDateDaysAgo(75), hours: 50 },
                { date: getDateDaysAgo(60), hours: 75 },
                { date: getDateDaysAgo(45), hours: 100 },
                { date: getDateDaysAgo(30), hours: 125 },
                { date: getDateDaysAgo(15), hours: 145 },
                { date: getDateDaysAgo(7), hours: 156 },
            ],
        },
        {
            name: 'Robert Kim',
            age: 71,
            condition: "Parkinson's disease - Hand tremor therapy",
            therapistId,
            avatarUrl: 'https://picsum.photos/seed/robert/100/100',
            avatarHint: 'person',
            lastSession: Timestamp.fromDate(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
            therapistNotes: 'Focus on stability exercises. Tremor reduction techniques showing promise. Family reports improved daily activities.',
            totalHours: 64,
            avgGripStrength: 16,
            goalsCompleted: 11,
            targetStrength: 20,
            gripStrengthHistory: [
                { date: getDateDaysAgo(70), strength: 11 },
                { date: getDateDaysAgo(60), strength: 12 },
                { date: getDateDaysAgo(50), strength: 13 },
                { date: getDateDaysAgo(40), strength: 14 },
                { date: getDateDaysAgo(30), strength: 15 },
                { date: getDateDaysAgo(20), strength: 16 },
                { date: getDateDaysAgo(3), strength: 16 },
            ],
            therapyHoursHistory: [
                { date: getDateDaysAgo(70), hours: 8 },
                { date: getDateDaysAgo(60), hours: 18 },
                { date: getDateDaysAgo(50), hours: 28 },
                { date: getDateDaysAgo(40), hours: 38 },
                { date: getDateDaysAgo(30), hours: 48 },
                { date: getDateDaysAgo(20), hours: 56 },
                { date: getDateDaysAgo(3), hours: 64 },
            ],
        },
        {
            name: 'Sarah Johnson',
            age: 34,
            condition: 'Sports injury - Wrist fracture recovery',
            therapistId,
            avatarUrl: 'https://picsum.photos/seed/sarah/100/100',
            avatarHint: 'person',
            lastSession: Timestamp.fromDate(new Date()),
            therapistNotes: 'Highly motivated patient. Rapid recovery expected. Cleared for moderate resistance exercises.',
            totalHours: 28,
            avgGripStrength: 22,
            goalsCompleted: 9,
            targetStrength: 30,
            gripStrengthHistory: [
                { date: getDateDaysAgo(42), strength: 10 },
                { date: getDateDaysAgo(35), strength: 14 },
                { date: getDateDaysAgo(28), strength: 17 },
                { date: getDateDaysAgo(21), strength: 19 },
                { date: getDateDaysAgo(14), strength: 21 },
                { date: getDateDaysAgo(7), strength: 22 },
                { date: getDateDaysAgo(0), strength: 22 },
            ],
            therapyHoursHistory: [
                { date: getDateDaysAgo(42), hours: 3 },
                { date: getDateDaysAgo(35), hours: 8 },
                { date: getDateDaysAgo(28), hours: 12 },
                { date: getDateDaysAgo(21), hours: 16 },
                { date: getDateDaysAgo(14), hours: 20 },
                { date: getDateDaysAgo(7), hours: 24 },
                { date: getDateDaysAgo(0), hours: 28 },
            ],
        },
    ];
}

export function seedDatabase() {
    // Check if database already has data
    const dbData = db.getData();

    if (dbData.patients && Object.keys(dbData.patients).length > 0) {
        console.log('Database already seeded, skipping...');
        return false;
    }

    const therapistId = 'test-user-id';  // Match the mock user ID
    const samplePatients = generateSamplePatients(therapistId);

    console.log('Seeding database with sample patients...');

    samplePatients.forEach((patient) => {
        const id = Math.random().toString(36).substring(2, 15);
        const collection = dbData.patients || {};
        collection[id] = patient;
        dbData.patients = collection;
    });

    // Save to localStorage
    if (typeof window !== 'undefined') {
        localStorage.setItem('neurogrip_db', JSON.stringify(dbData));
    }

    console.log(`Successfully seeded ${samplePatients.length} patients`);
    return true;
}
