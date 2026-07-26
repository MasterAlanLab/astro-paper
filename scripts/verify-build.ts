import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import sharp from "sharp";
import { SITE } from "../src/config";

const getFiles = async (directory: string, suffix: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(entry => {
      const path = `${directory}/${entry.name}`;
      return entry.isDirectory()
        ? getFiles(path, suffix)
        : Promise.resolve(entry.name.endsWith(suffix) ? [path] : []);
    })
  );

  return files.flat();
};

const htmlFiles = await getFiles("dist", ".html");
const htmlContents = await Promise.all(htmlFiles.map(file => readFile(file, "utf8")));

for (const html of htmlContents) {
  assert(!html.includes('datePublished":"undefined"'));
  assert(!html.includes('class="false"'));
}

const indexHtml = await readFile("dist/index.html", "utf8");
const aboutHtml = await readFile("dist/about/index.html", "utf8");

const articleFiles = await getFiles("dist/posts", "index.html");
const articleFile = articleFiles.find(
  file => !/dist\/posts(\/\d+)?\/index\.html$/.test(file)
);
assert(articleFile, "dist/posts must contain at least one article page");
const articleHtml = await readFile(articleFile, "utf8");

assert(indexHtml.includes('"@type":"WebSite"'));
assert(aboutHtml.includes('"@type":"WebPage"'));
assert(articleHtml.includes('"@type":"BlogPosting"'), articleFile);

const homePostCount = indexHtml.match(/data-home-post(?:\s|>)/g)?.length ?? 0;
assert(
  homePostCount > 0 && homePostCount <= SITE.postPerIndex,
  `index.html must render between 1 and ${SITE.postPerIndex} home posts, got ${homePostCount}`
);

const sitemap = await readFile("dist/sitemap-0.xml", "utf8");
assert(!sitemap.includes("home-posts.json"));

const ogImageFiles = [
  "dist/og.png",
  ...(await getFiles("dist/posts", "index.png")),
];
const ogImageHashes = new Set<string>();

for (const file of ogImageFiles) {
  const image = await readFile(file);
  const metadata = await sharp(image).metadata();

  assert.equal(metadata.width, 1200, `${file} must be 1200px wide`);
  assert.equal(metadata.height, 630, `${file} must be 630px high`);
  ogImageHashes.add(
    createHash("sha256").update(image.toString("base64")).digest("hex")
  );
}

assert.equal(
  ogImageHashes.size,
  ogImageFiles.length,
  "Each dynamic OG image must contain unique page content"
);

process.stdout.write(
  `Verified ${htmlFiles.length} HTML files and ${ogImageFiles.length} OG images.\n`
);
