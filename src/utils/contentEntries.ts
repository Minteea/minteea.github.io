import { getCollection } from "astro:content";

export const postEntries = await getCollection("post", ({ data }) => {
  return import.meta.env.PROD ? data.draft !== true : true;
});

export const videoEntries = await getCollection("video");
