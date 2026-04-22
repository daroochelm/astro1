// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders'; // <-- Nowy import dla Loadera plików lokalnych
import { z } from 'astro:schema';

const plantsCollection = defineCollection({
  // Definiujemy loader, który szuka wszystkich plików .json w folderze src/content/plants
  loader: glob({ pattern: "**/*.json", base: "./src/content/plants" }),
  
  schema: z.object({
    src: z.string(),
    thumb: z.string(),
    caption: z.string(),
    latina: z.string(),
    family: z.string(),
    flowering: z.string(),
    months: z.array(z.number()).optional(),
    habitat: z.string(),
    occurrence: z.string(),
    protection: z.string(),
    description: z.string(),
    category: z.string(),
  }),
});

export const collections = {
  'plants': plantsCollection,
};