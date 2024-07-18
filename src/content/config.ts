import { z, defineCollection } from "astro:content";
export const collections = {
  post: defineCollection({
    type: "content",
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
    type: "content",
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
};
