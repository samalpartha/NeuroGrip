"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAssistanceLevel } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2, Wand2 } from "lucide-react";
import type { AdjustAssistanceLevelOutput } from "@/ai/flows/adaptive-assist-adjustment";
import { Progress } from "@/components/ui/progress";

type FormInputs = {
  gripStrength: number;
  targetStrength: number;
  patientCondition: string;
};

interface AdaptiveAssistClientProps {
    patientCondition: string;
    targetStrength: number;
}

export function AdaptiveAssistClient({ patientCondition, targetStrength }: AdaptiveAssistClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AdjustAssistanceLevelOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      patientCondition: patientCondition,
      targetStrength: targetStrength,
      gripStrength: 0,
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    setError(null);
    setAiResult(null);

    const result = await getAssistanceLevel(data);

    if ('error' in result) {
      setError(result.error);
    } else {
      setAiResult(result);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="text-primary"/>
            <span>Adaptive Assist AI</span>
          </CardTitle>
          <CardDescription>
            Get an AI-powered recommendation for the robotic glove's assistance level.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gripStrength">Current Grip Strength (N)</Label>
            <Input
              id="gripStrength"
              type="number"
              {...register("gripStrength", { required: true, valueAsNumber: true, min: 0 })}
            />
            {errors.gripStrength && <p className="text-xs text-destructive">This field is required.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetStrength">Target Strength (N)</Label>
            <Input
              id="targetStrength"
              type="number"
              disabled
              {...register("targetStrength", { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientCondition">Patient Condition</Label>
            <Textarea
              id="patientCondition"
              disabled
              {...register("patientCondition")}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-stretch">
            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Adjust Assistance
            </Button>
            {error && <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>}
            {aiResult && (
                <Card className="bg-primary/5">
                    <CardHeader>
                        <CardTitle>Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <Label>Assistance Level</Label>
                                <span className="font-bold text-primary text-lg">{aiResult.assistanceLevel}%</span>
                            </div>
                            <Progress value={aiResult.assistanceLevel} />
                        </div>
                        <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Reasoning</AlertTitle>
                            <AlertDescription>{aiResult.reasoning}</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            )}
        </CardFooter>
      </form>
    </Card>
  );
}
