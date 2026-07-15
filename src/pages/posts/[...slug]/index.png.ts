import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { loadOgFonts } from "@/utils/loadOgFonts";
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

  await loadOgFonts(fontCharacters + SITE.title + "by", "posts");

  const imageBuffers = await Promise.all(posts.map(generateOgImageForPost));

  return posts.map((post, index) => ({
    params: { slug: getPath(post.id, post.filePath, false) },
    props: { imageBuffer: imageBuffers[index] },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const { imageBuffer } = props as { imageBuffer: ArrayBuffer };
  return new Response(new Uint8Array(imageBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
