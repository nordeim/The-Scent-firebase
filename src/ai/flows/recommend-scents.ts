// src/ai/flows/recommend-scents.ts
'use server';
/**
 * @fileOverview An AI agent that recommends scents based on user quiz responses.
 *
 * - recommendScents - A function that handles the scent recommendation process.
 * - RecommendScentsInput - The input type for the recommendScents function.
 * - RecommendScentsOutput - The return type for the recommendScents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendScentsInputSchema = z.object({
  mood: z
    .string()
    .describe('The users current mood. e.g. stressed, anxious, happy, sad.'),
  desiredEffect: z
    .string()
    .describe('The desired effect of the aromatherapy. e.g. relaxation, energy, focus, happiness.'),
  scentProfile: z
    .string()
    .describe('The users preferred scent profile. e.g. floral, herbal, citrus, woody, minty.'),
});
export type RecommendScentsInput = z.infer<typeof RecommendScentsInputSchema>;

const RecommendScentsOutputSchema = z.object({
  productRecommendations: z
    .array(z.string())
    .describe('A list of product names recommended based on the quiz answers.'),
  reasoning: z
    .string()
    .describe('The AI agents reasoning for recommending these products.'),
});
export type RecommendScentsOutput = z.infer<typeof RecommendScentsOutputSchema>;

export async function recommendScents(input: RecommendScentsInput): Promise<RecommendScentsOutput> {
  return recommendScentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendScentsPrompt',
  input: {schema: RecommendScentsInputSchema},
  output: {schema: RecommendScentsOutputSchema},
  prompt: `You are an AI aromatherapy expert. A user has taken a quiz and provided the following information:

Mood: {{{mood}}}
Desired Effect: {{{desiredEffect}}}
Scent Profile: {{{scentProfile}}}

Based on this information, recommend aromatherapy products that would be suitable for the user.
Explain your reasoning for the recommendations.

Output ONLY a JSON object in the following format:
{
  "productRecommendations": ["Product 1", "Product 2", "Product 3"],
  "reasoning": "Explanation of why these products were recommended"
}`,
});

const recommendScentsFlow = ai.defineFlow(
  {
    name: 'recommendScentsFlow',
    inputSchema: RecommendScentsInputSchema,
    outputSchema: RecommendScentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
