import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import subsetFont from "subset-font";

export type FontData = {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: "normal";
};

const require = createRequire(import.meta.url);

// Noto Sans SC woff files are vendored in src/assets/fonts to avoid
// installing the full 20 MB @openfonts package for two weights.
const notoFontFile = (weight: number) =>
  join(
    process.cwd(),
    "src/assets/fonts",
    `noto-sans-sc-chinese-simplified-${weight}.woff`
  );

const fontConfigs = [
  {
    name: "IBM Plex Mono",
    file: require.resolve("@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff"),
    weight: 400,
  },
  {
    name: "IBM Plex Mono",
    file: require.resolve("@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff"),
    weight: 700,
  },
  {
    name: "Noto Sans SC",
    file: notoFontFile(400),
    weight: 400,
  },
  {
    name: "Noto Sans SC",
    file: notoFontFile(700),
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
      data: await readFile(file),
      weight,
      style: "normal" as const,
    }))
  );

const getUniqueCharacters = (text: string) => [...new Set(text)].join("");

export const loadOgFonts = (text: string) => {
  const cachedFontData = fontDataCache.get(text);
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

  fontDataCache.set(text, fontDataPromise);
  return fontDataPromise;
};
