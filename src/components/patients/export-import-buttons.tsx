'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, Upload, FileJson, FileSpreadsheet, Loader2 } from 'lucide-react';
import { exportToJSON, exportToCSV, importFromJSON } from '@/lib/data-export';
import { Patient } from '@/lib/types';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ExportImportButtonsProps {
    patients: Patient[];
    therapistId: string;
    onImportComplete?: () => void;
}

export function ExportImportButtons({ patients, therapistId, onImportComplete }: ExportImportButtonsProps) {
    const [isImporting, setIsImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleExportJSON = () => {
        try {
            exportToJSON(patients);
            toast({
                title: 'Export Successful',
                description: `Exported ${patients.length} patient(s) to JSON`,
            });
        } catch (error) {
            toast({
                title: 'Export Failed',
                description: error instanceof Error ? error.message : 'Unknown error',
                variant: 'destructive',
            });
        }
    };

    const handleExportCSV = () => {
        try {
            exportToCSV(patients);
            toast({
                title: 'Export Successful',
                description: `Exported ${patients.length} patient(s) to CSV`,
            });
        } catch (error) {
            toast({
                title: 'Export Failed',
                description: error instanceof Error ? error.message : 'Unknown error',
                variant: 'destructive',
            });
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        try {
            const result = await importFromJSON(file, therapistId);

            if (result.success) {
                toast({
                    title: 'Import Successful',
                    description: result.message,
                });
                onImportComplete?.();
                // Reload the page to refresh data
                window.location.reload();
            } else {
                toast({
                    title: 'Import Failed',
                    description: result.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Import Failed',
                description: error instanceof Error ? error.message : 'Unknown error',
                variant: 'destructive',
            });
        } finally {
            setIsImporting(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="flex gap-2">
            {/* Export Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleExportJSON}>
                        <FileJson className="h-4 w-4 mr-2" />
                        Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportCSV}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export as CSV
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Import Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleImportClick}
                disabled={isImporting}
            >
                {isImporting ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Importing...
                    </>
                ) : (
                    <>
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                    </>
                )}
            </Button>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}
