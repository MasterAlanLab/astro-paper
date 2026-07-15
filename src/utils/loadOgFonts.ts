import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import subsetFont from "subset-font";

type FontData = {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: "normal";
};

const require = createRequire(import.meta.url);

const fontConfigs = [
  {
    name: "IBM Plex Mono",
    file: "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff",
    weight: 400,
  },
  {
    name: "IBM Plex Mono",
    file: "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff",
    weight: 700,
  },
  {
    name: "Noto Sans SC",
    file: "@openfonts/noto-sans-sc_chinese-simplified/files/noto-sans-sc-chinese-simplified-400.woff",
    weight: 400,
  },
  {
    name: "Noto Sans SC",
    file: "@openfonts/noto-sans-sc_chinese-simplified/files/noto-sans-sc-chinese-simplified-700.woff",
    weight: 700,
  },
] as const;

const fontDataCache = new Map<string, Promise<FontData[]>>();
let baseFontDataPromise: ReturnType<typeof loadBaseFontData> | undefined;

const toArrayBuffer = (font: {
  buffer: ArrayBufferLike;
  byteOffset: number;
  byteLength: number;
}) =>
  font.buffer.slice(
    font.byteOffset,
    font.byteOffset + font.byteLength
  ) as ArrayBuffer;

const loadBaseFontData = () =>
  Promise.all(
    fontConfigs.map(async ({ name, file, weight }) => ({
      name,
      data: await readFile(require.resolve(file)),
      weight,
      style: "normal" as const,
    }))
  );

const getUniqueCharacters = (text: string) => [...new Set(text)].join("");

export const loadOgFonts = (text: string, cacheKey = text) => {
  const cachedFontData = fontDataCache.get(cacheKey);
  if (cachedFontData) return cachedFontData;

  baseFontDataPromise ??= loadBaseFontData();
  const fontDataPromise = baseFontDataPromise.then(baseFonts =>
    Promise.all(
      baseFonts.map(async ({ name, data, weight, style }) => ({
        name,
        data: toArrayBuffer(
          await subsetFont(data, getUniqueCharacters(text), {
            targetFormat: "woff",
          })
        ),
        weight,
        style,
      }))
    )
  );

  fontDataCache.set(cacheKey, fontDataPromise);
  return fontDataPromise;
};
