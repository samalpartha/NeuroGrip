import { Patient } from './types';
import { db } from './local-db';
import { z } from 'zod';

// Validation schema for imported patient data
const PatientSchema = z.object({
    name: z.string(),
    age: z.number(),
    condition: z.string(),
    therapistId: z.string(),
    avatarUrl: z.string().optional(),
    avatarHint: z.string().optional(),
    lastSession: z.object({
        seconds: z.number(),
        nanoseconds: z.number().optional(),
    }).optional(),
    therapistNotes: z.string().optional(),
    totalHours: z.number().optional(),
    avgGripStrength: z.number(),
    goalsCompleted: z.number().optional(),
    targetStrength: z.number(),
    gripStrengthHistory: z.array(z.object({
        date: z.string(),
        strength: z.number(),
    })).optional(),
    therapyHoursHistory: z.array(z.object({
        date: z.string(),
        hours: z.number(),
    })).optional(),
});

/**
 * Export all patients to JSON format
 */
export function exportToJSON(patients: Patient[]): void {
    const dataStr = JSON.stringify(patients, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neurogrip-patients-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Export patients to CSV format
 */
export function exportToCSV(patients: Patient[]): void {
    // CSV headers
    const headers = [
        'Name',
        'Age',
        'Condition',
        'Avg Grip Strength',
        'Target Strength',
        'Progress %',
        'Total Hours',
        'Goals Completed',
        'Last Session',
    ];

    // Convert patients to CSV rows
    const rows = patients.map(patient => {
        const progress = ((patient.avgGripStrength / patient.targetStrength) * 100).toFixed(1);
        const lastSession = patient.lastSession
            ? new Date(patient.lastSession.seconds * 1000).toLocaleDateString()
            : 'Never';

        return [
            `"${patient.name}"`,
            patient.age,
            `"${patient.condition}"`,
            patient.avgGripStrength,
            patient.targetStrength,
            progress,
            patient.totalHours || 0,
            patient.goalsCompleted || 0,
            lastSession,
        ].join(',');
    });

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows].join('\n');

    const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neurogrip-patients-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Import patients from JSON file
 */
export async function importFromJSON(
    file: File,
    currentTherapistId: string
): Promise<{ success: boolean; message: string; count?: number }> {
    try {
        const text = await file.text();
        const data = JSON.parse(text);

        // Validate that data is an array
        if (!Array.isArray(data)) {
            return {
                success: false,
                message: 'Invalid file format. Expected an array of patients.',
            };
        }

        // Validate each patient
        const validatedPatients: Patient[] = [];
        for (let i = 0; i < data.length; i++) {
            try {
                const patient = PatientSchema.parse(data[i]);
                // Assign to current therapist
                validatedPatients.push({
                    ...patient,
                    therapistId: currentTherapistId,
                    id: Math.random().toString(36).substring(2, 15), // Generate new ID
                } as Patient);
            } catch (error) {
                return {
                    success: false,
                    message: `Invalid patient data at index ${i}: ${error instanceof Error ? error.message : 'Unknown error'}`,
                };
            }
        }

        // Import patients to database
        const dbData = db.getData();
        const patientsCollection = dbData.patients || {};

        validatedPatients.forEach(patient => {
            patientsCollection[patient.id] = patient;
        });

        dbData.patients = patientsCollection;

        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('neurogrip_db', JSON.stringify(dbData));
        }

        return {
            success: true,
            message: `Successfully imported ${validatedPatients.length} patient(s)`,
            count: validatedPatients.length,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to import: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
    }
}

/**
 * Clear all patient data (for testing/reset purposes)
 */
export function clearAllPatients(therapistId: string): void {
    const dbData = db.getData();
    const patientsCollection = dbData.patients || {};

    // Remove only patients belonging to this therapist
    Object.keys(patientsCollection).forEach(id => {
        if (patientsCollection[id].therapistId === therapistId) {
            delete patientsCollection[id];
        }
    });

    dbData.patients = patientsCollection;

    // Save to localStorage
    if (typeof window !== 'undefined') {
        localStorage.setItem('neurogrip_db', JSON.stringify(dbData));
    }
}
