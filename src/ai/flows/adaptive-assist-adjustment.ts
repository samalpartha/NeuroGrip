'use server';

/**
 * @fileOverview AI-powered flow to adjust the assistance level of a robotic glove based on the patient's grip strength.
 *
 * - adjustAssistanceLevel - A function that adjusts the assistance level.
 * - AdjustAssistanceLevelInput - The input type for the adjustAssistanceLevel function.
 * - AdjustAssistanceLevelOutput - The return type for the adjustAssistanceLevel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustAssistanceLevelInputSchema = z.object({
  gripStrength: z
    .number()
    .describe("The patient's current grip strength, measured in Newtons."),
  targetStrength: z
    .number()
    .describe("The target grip strength for the exercise, measured in Newtons."),
  patientCondition: z
    .string()
    .describe('Description of the patient condition, limitations, and therapy goals.'),
});
export type AdjustAssistanceLevelInput = z.infer<typeof AdjustAssistanceLevelInputSchema>;

const AdjustAssistanceLevelOutputSchema = z.object({
  assistanceLevel: z
    .number()
    .describe(
      'The recommended assistance level, ranging from 0 (no assistance) to 100 (full assistance), as a percentage.'
    ),
  reasoning: z
    .string()
    .describe('Explanation for the adjustment of the assistance level.'),
});
export type AdjustAssistanceLevelOutput = z.infer<typeof AdjustAssistanceLevelOutputSchema>;

export async function adjustAssistanceLevel(input: AdjustAssistanceLevelInput): Promise<AdjustAssistanceLevelOutput> {
  return adjustAssistanceLevelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustAssistanceLevelPrompt',
  input: {schema: AdjustAssistanceLevelInputSchema},
  output: {schema: AdjustAssistanceLevelOutputSchema},
  prompt: `You are an AI assistant that helps physical therapists adjust the assistance level of a robotic glove for patients undergoing hand rehabilitation.

  Based on the patient's current grip strength ({{gripStrength}} N), the target grip strength for the exercise ({{targetStrength}} N), and the patient's condition ({{patientCondition}}), recommend an appropriate assistance level.

  The assistance level should be a percentage, ranging from 0 (no assistance) to 100 (full assistance).

  Consider the following factors when determining the assistance level:
  - The difference between the patient's current grip strength and the target grip strength.
  - The patient's condition and any limitations they may have.
  - The goal of promoting active-assist therapy, where the patient is encouraged to exert effort.
  - Err on the side of lower assistance levels to encourage patient effort, unless safety is a concern.

  Provide a brief explanation for your recommendation.

  Your output should be formatted as a JSON object with "assistanceLevel" (number between 0 and 100) and "reasoning" (string) fields.
`,
});

const adjustAssistanceLevelFlow = ai.defineFlow(
  {
    name: 'adjustAssistanceLevelFlow',
    inputSchema: AdjustAssistanceLevelInputSchema,
    outputSchema: AdjustAssistanceLevelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
