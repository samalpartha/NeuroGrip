"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Target } from "lucide-react";

interface GamifiedExerciseProps {
  targetStrength: number;
}

export function GamifiedExercise({ targetStrength }: GamifiedExerciseProps) {
  const [gripStrength, setGripStrength] = useState(0);
  const [repetitions, setRepetitions] = useState(0);

  const progress = Math.min((gripStrength / targetStrength) * 100, 100);
  const isTargetReached = gripStrength >= targetStrength;

  const handleSqueeze = () => {
    if (isTargetReached) {
      setRepetitions(repetitions + 1);
      // Reset for next repetition
      setGripStrength(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grip Challenge</CardTitle>
        <CardDescription>
          Use the slider to simulate your grip. Reach the target strength to
          complete a repetition.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center justify-between gap-4">
            <div className="text-lg font-bold">
                {gripStrength.toFixed(0)} <span className="text-sm font-normal text-muted-foreground">N</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold">
                <Target className="h-5 w-5" />
                <span>Target: {targetStrength} N</span>
            </div>
        </div>

        <div className="w-full h-24 bg-muted rounded-lg flex items-center justify-center p-4">
            <div className="w-full h-8 bg-background rounded-full overflow-hidden border">
                <div
                    className="h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ 
                        width: `${progress}%`,
                        backgroundColor: isTargetReached ? 'hsl(var(--accent))' : 'hsl(var(--primary))'
                    }}
                />
            </div>
        </div>
        
        <Slider
          value={[gripStrength]}
          onValueChange={(value) => setGripStrength(value[0])}
          max={targetStrength * 1.5} // Allow overshooting the target
          step={1}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="font-bold text-lg">Repetitions: {repetitions}</div>
        <Button onClick={handleSqueeze} disabled={!isTargetReached} size="lg">
          {isTargetReached ? "Complete Rep" : "Squeeze..."}
        </Button>
      </CardFooter>
    </Card>
  );
}
