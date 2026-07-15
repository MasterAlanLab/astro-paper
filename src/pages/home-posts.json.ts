import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import getSortedPosts from "@/utils/getSortedPosts";
import { toHomePostSummary } from "@/utils/homePosts";

export const GET: APIRoute = async () => {
  const posts = getSortedPosts(await getCollection("blog"));

  return Response.json(posts.map(toHomePostSummary), {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
