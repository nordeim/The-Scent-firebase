// src/ai/flows/generate-product-descriptions.ts
'use server';

/**
 * @fileOverview An AI agent that generates product descriptions for aromatherapy products.
 *
 * - generateProductDescription - A function that generates a product description.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the aromatherapy product.'),
  category: z.string().describe('The category of the aromatherapy product (e.g., relaxation, energy, focus).'),
  scentFamily: z.string().describe('The scent family of the product (e.g., floral, herbal, citrus, woody, minty).'),
  intendedEffect: z.string().describe('The intended effect of the product (e.g., calming, invigorating, mood-boosting).'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in aromatherapy products. Based on the product details below, create a compelling and engaging product description.

Product Name: {{{name}}}
Category: {{{category}}}
Scent Family: {{{scentFamily}}}
Intended Effect: {{{intendedEffect}}}

Write a description that is approximately 100-150 words in length. Focus on the benefits and sensory experience the product provides to the user. Highlight key ingredients or unique aspects of the product, and convey a sense of quality and sophistication. Make it irresistable!
`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
