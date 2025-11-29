export interface GripStrengthData {
  date: string;
  strength: number;
}

export interface TherapyHoursData {
  date: string;
  hours: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  avatarUrl: string;
  avatarHint: string;
  lastSession: string;
  therapistNotes: string;
  therapistId: string; // a patient must belong to a therapist
  totalHours: number;
  avgGripStrength: number;
  goalsCompleted: number;
  targetStrength: number;
  gripStrengthHistory: GripStrengthData[];
  therapyHoursHistory: TherapyHoursData[];
}
