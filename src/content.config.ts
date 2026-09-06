import { defineCollection } from "astro:content";
import { z } from "astro/zod"
import { glob } from "astro/loaders";
export const collections = {
  post: defineCollection({
    loader: glob({ base: './src/content/post', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
      title: z.string(),
      date: z.date(),
      updated: z.date().nullish(),
      description: z.string().nullish(),
      author: z.string().nullish(),
      tags: z.array(z.string()).nullish(),
      draft: z.boolean().nullish(),
    }),
  }),
  video: defineCollection({
    loader: glob({ base: './src/content/video', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
      title: z.string(),
      date: z.date(),
      updated: z.date().nullish(),
      description: z.string().nullish(),
      tags: z.array(z.string()).nullish(),
      cover: z.string().nullish(),
      links: z
        .object({
          ac: z.number().nullish(),
          av: z.number().nullish(),
          bv: z.string().nullish(),
          mv: z.number().nullish(),
        })
        .nullish(),
    }),
  }),
  live: defineCollection({
    loader: glob({ base: './src/content/live', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
      title: z.string(),
      date: z.date(),
      id: z.string(),
      coverId: z.string().nullish(),
      series: z.string().nullish(),
      themeColor: z.string().nullish(),
      videoParts: z.array(z.string()).nullish(),
    }),
  }),
};
