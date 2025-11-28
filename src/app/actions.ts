
'use server';

import { adjustAssistanceLevel, type AdjustAssistanceLevelInput, type AdjustAssistanceLevelOutput } from '@/ai/flows/adaptive-assist-adjustment';

export async function getAssistanceLevel(input: AdjustAssistanceLevelInput): Promise<AdjustAssistanceLevelOutput | { error: string }> {
  try {
    const result = await adjustAssistanceLevel(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get assistance level from AI. Please try again.' };
  }
}
