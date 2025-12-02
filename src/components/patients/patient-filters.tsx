'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export type SortOption = 'name' | 'age' | 'progress' | 'lastSession';

interface PatientFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    conditionFilter: string;
    onConditionFilterChange: (condition: string) => void;
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
    availableConditions: string[];
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}

export function PatientFilters({
    searchQuery,
    onSearchChange,
    conditionFilter,
    onConditionFilterChange,
    sortBy,
    onSortChange,
    availableConditions,
    onClearFilters,
    hasActiveFilters,
}: PatientFiltersProps) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or condition..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Condition Filter */}
                    <Select value={conditionFilter} onValueChange={onConditionFilterChange}>
                        <SelectTrigger className="w-full md:w-[220px]">
                            <SelectValue placeholder="All Conditions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Conditions</SelectItem>
                            {availableConditions.map((condition) => (
                                <SelectItem key={condition} value={condition}>
                                    {condition}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Sort By */}
                    <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name (A-Z)</SelectItem>
                            <SelectItem value="age">Age</SelectItem>
                            <SelectItem value="progress">Progress</SelectItem>
                            <SelectItem value="lastSession">Last Session</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onClearFilters}
                            title="Clear all filters"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
