// src/content.config.ts
import { defineCollection, z } from 'astro:content'; // <--- Zmiana tutaj
import { glob } from 'astro/loaders';


const plantsCollection = defineCollection({
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

const mushroomCollection = defineCollection({
  // Zaktualizowany komentarz: szuka plików w folderze mushroom
  loader: glob({ pattern: "**/*.json", base: "./src/content/mushroom" }),
  schema: z.object({
    src: z.string(),
    thumb: z.string(),
    caption: z.string(),
    latina: z.string(),
    family: z.string(),
    fructing: z.string(), // Uwaga: grzyby nie kwitną, ale zachowałem to pole dla spójności Twoich JSON-ów
    months: z.array(z.number()).optional(),
    habitat: z.string(),
    occurrence: z.string(),
    protection: z.string(),
    description: z.string(),
    category: z.string(),
  }),
});

const insectCollection = defineCollection({
  // Zaktualizowany komentarz: szuka plików w folderze insect
  loader: glob({ pattern: "**/*.json", base: "./src/content/insect" }),
  schema: z.object({
    src: z.string(),
    thumb: z.string(),
    caption: z.string(),
    latina: z.string(),
    family: z.string(),
    activity: z.string(), // Podobnie jak wyżej, możesz z czasem zmienić to np. na "activity" dla owadów
    months: z.array(z.number()).optional(),
    habitat: z.string(),
    occurrence: z.string(),
    protection: z.string(),
    description: z.string(),
    category: z.string(),
  }),
});

// POPRAWKA: Jeden główny eksport dla wszystkich kolekcji z unikalnymi kluczami
export const collections = {
  'plants': plantsCollection,
  'mushroom': mushroomCollection,
  'insect': insectCollection,
};