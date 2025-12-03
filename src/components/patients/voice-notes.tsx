"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Play, Square, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface VoiceNote {
    id: string;
    date: Date;
    duration: string;
    url: string; // In a real app, this would be a blob URL
}

export function VoiceNotes() {
    const [isRecording, setIsRecording] = useState(false);
    const [notes, setNotes] = useState<VoiceNote[]>([]);
    const [recordingTime, setRecordingTime] = useState(0);

    // Mock recording functionality
    const startRecording = () => {
        setIsRecording(true);
        setRecordingTime(0);
        // In a real app, we would start MediaRecorder here
        const interval = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, 1000);
        (window as any).recordingInterval = interval;
    };

    const stopRecording = () => {
        setIsRecording(false);
        clearInterval((window as any).recordingInterval);

        // Add a mock note
        const newNote: VoiceNote = {
            id: Math.random().toString(36).substring(7),
            date: new Date(),
            duration: formatDuration(recordingTime),
            url: "#",
        };

        setNotes([newNote, ...notes]);
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-primary" />
                    Voice Notes
                </CardTitle>
                <CardDescription>Record session notes and observations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center p-6 border-2 border-dashed rounded-lg bg-muted/50">
                    {isRecording ? (
                        <div className="text-center space-y-4">
                            <div className="text-3xl font-mono font-bold text-red-500 animate-pulse">
                                {formatDuration(recordingTime)}
                            </div>
                            <Button variant="destructive" size="lg" onClick={stopRecording} className="rounded-full h-16 w-16">
                                <Square className="h-6 w-6 fill-current" />
                            </Button>
                            <p className="text-sm text-muted-foreground">Recording...</p>
                        </div>
                    ) : (
                        <Button variant="secondary" size="lg" onClick={startRecording} className="rounded-full h-16 w-16">
                            <Mic className="h-8 w-8" />
                        </Button>
                    )}
                </div>

                <div className="space-y-2">
                    {notes.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-4">No voice notes recorded yet.</p>
                    ) : (
                        notes.map((note) => (
                            <div key={note.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                <div className="flex items-center gap-3">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                                        <Play className="h-4 w-4 fill-current" />
                                    </Button>
                                    <div>
                                        <p className="font-medium text-sm">{format(note.date, "MMM d, yyyy • h:mm a")}</p>
                                        <p className="text-xs text-muted-foreground">{note.duration}</p>
                                    </div>
                                </div>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteNote(note.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
