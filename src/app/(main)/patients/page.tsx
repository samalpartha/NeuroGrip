'use client';

import { PatientList } from '@/components/patients/patient-list';
import { PatientFilters, SortOption } from '@/components/patients/patient-filters';
import { ExportImportButtons } from '@/components/patients/export-import-buttons';
import type { Patient } from '@/lib/types';
import { Loader2, Users } from 'lucide-react';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from '@/lib/db';
import { useState, useMemo } from 'react';

function PatientsPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const patientsQuery = useMemoFirebase(() => {
    if (!firestore || !user) {
      return null;
    }
    return query(collection(firestore, 'patients'), where('therapistId', '==', user.uid));
  }, [firestore, user]);

  const { data: patients, isLoading } = useCollection<Patient>(patientsQuery);

  // Get unique conditions for filter dropdown
  const availableConditions = useMemo(() => {
    if (!patients) return [];
    const conditions = new Set(patients.map(p => p.condition));
    return Array.from(conditions).sort();
  }, [patients]);

  // Filter and sort patients
  const filteredPatients = useMemo(() => {
    if (!patients) return [];

    let filtered = [...patients];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.condition.toLowerCase().includes(query)
      );
    }

    // Apply condition filter
    if (conditionFilter !== 'all') {
      filtered = filtered.filter((p) => p.condition === conditionFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        case 'progress': {
          const progressA = (a.avgGripStrength / a.targetStrength) * 100;
          const progressB = (b.avgGripStrength / b.targetStrength) * 100;
          return progressB - progressA; // Descending order
        }
        case 'lastSession': {
          const dateA = a.lastSession?.seconds || 0;
          const dateB = b.lastSession?.seconds || 0;
          return dateB - dateA; // Most recent first
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [patients, searchQuery, conditionFilter, sortBy]);

  // Check if any filters are active
  const hasActiveFilters = searchQuery.trim() !== '' || conditionFilter !== 'all';

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setConditionFilter('all');
  };

  const isContentLoading = isLoading || !patientsQuery;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Manage Patients</h1>
        </div>
        {!isContentLoading && patients && patients.length > 0 && user && (
          <ExportImportButtons
            patients={patients}
            therapistId={user.uid}
          />
        )}
      </div>

      {isContentLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          <PatientFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            conditionFilter={conditionFilter}
            onConditionFilterChange={setConditionFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            availableConditions={availableConditions}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
          <PatientList
            patients={filteredPatients}
            totalCount={patients?.length || 0}
            filteredCount={filteredPatients.length}
            hasActiveFilters={hasActiveFilters}
          />
        </>
      )}
    </div>
  );
}

export default PatientsPage;
