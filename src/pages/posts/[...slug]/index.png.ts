import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getPath } from "@/utils/getPath";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { loadOgFonts, type FontData } from "@/utils/loadOgFonts";
import postFilter from "@/utils/postFilter";
import { SITE } from "@/config";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("blog").then(p =>
    p.filter(post => postFilter(post) && !post.data.ogImage)
  );

  const fontCharacters = posts
    .map(post => post.data.title + post.data.author)
    .join("");

  const fonts = await loadOgFonts(fontCharacters + SITE.title + "by");

  return posts.map(post => ({
    params: { slug: getPath(post.id, post.filePath, false) },
    props: { post, fonts },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const { post, fonts } = props as {
    post: CollectionEntry<"blog">;
    fonts: FontData[];
  };
  const imageBuffer = await generateOgImageForPost(post, fonts);
  return new Response(new Uint8Array(imageBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
