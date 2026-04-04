import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

let fallbackOgImagePng: ArrayBuffer | undefined;

function toArrayBuffer(bytes: {
  buffer: ArrayBufferLike;
  byteOffset: number;
  byteLength: number;
}): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  ) as ArrayBuffer;
}

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return toArrayBuffer(pngData.asPng());
}

async function getFallbackOgImagePng() {
  if (!fallbackOgImagePng) {
    const fallbackJpg = await readFile(
      new URL("../../public/astropaper-og.jpg", import.meta.url)
    );
    fallbackOgImagePng = toArrayBuffer(
      await sharp(fallbackJpg).png().toBuffer()
    );
  }

  return fallbackOgImagePng;
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  try {
    const svg = await postOgImage(post);
    return svgBufferToPngBuffer(svg);
  } catch {
    return getFallbackOgImagePng();
  }
}

export async function generateOgImageForSite() {
  try {
    const svg = await siteOgImage();
    return svgBufferToPngBuffer(svg);
  } catch {
    return getFallbackOgImagePng();
  }
}
