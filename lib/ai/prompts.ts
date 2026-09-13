import { z } from "zod";

export const SceneSchema = z.object({
  timestamp: z.string(),
  visual: z.string(),
  audio: z.string(),
  note: z.string(),
});

export const ViralReelIdeaSchema = z.object({
  id: z.string(),
  title: z.string(),
  viralHook: z.string(),
  coreConcept: z.string(),
  opening: z.string(),
  sceneStructure: z.array(SceneSchema),
  retentionMechanism: z.string(),
  emotionalTrigger: z.string(),
  cta: z.string(),
  caption: z.string(),
  hashtags: z.array(z.string()),
  whyItWorks: z.string(),
});

export type ViralReelIdea = z.infer<typeof ViralReelIdeaSchema>;

export const ViralHookSchema = z.object({
  id: z.string(),
  framework: z.string(),
  hook: z.string(),
  psychologyExplanation: z.string(),
  exampleDelivery: z.string(),
});

export type ViralHook = z.infer<typeof ViralHookSchema>;

export const CaptionOutputSchema = z.object({
  id: z.string(),
  tone: z.string(),
  headline: z.string(),
  body: z.string(),
  cta: z.string(),
  hashtags: z.array(z.string()),
  fullFormatted: z.string(),
});

export type CaptionOutput = z.infer<typeof CaptionOutputSchema>;
