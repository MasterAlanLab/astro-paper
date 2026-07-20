import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";
import { getPath } from "./getPath";
import { slugifyStr } from "./slugify";

type Post = CollectionEntry<"blog">;

export interface HomeCategory {
  label: string;
  filter: string;
  count: number;
}

export interface HomePostSummary {
  path: string;
  title: string;
  description: string;
  pubDatetime: string;
  publishedDate: string;
  categories: string[];
}

export const getHomePostCategories = (post: Post) =>
  Array.from(new Set(post.data.categories.map(slugifyStr)));

export const getHomeCategories = (posts: Post[]): HomeCategory[] => {
  const categories = new Map<string, HomeCategory>();

  for (const post of posts) {
    const postCategories = new Set<string>();

    for (const label of post.data.categories) {
      const filter = slugifyStr(label);
      if (postCategories.has(filter)) continue;

      postCategories.add(filter);
      const category = categories.get(filter);
      if (category) {
        category.count += 1;
      } else {
        categories.set(filter, { label, filter, count: 1 });
      }
    }
  }

  return Array.from(categories.values()).sort((a, b) =>
    a.label.localeCompare(b.label, "zh-CN")
  );
};

export const formatPublishedDate = (post: Post) =>
  new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: post.data.timezone || SITE.timezone,
  }).format(post.data.pubDatetime);

export const toHomePostSummary = (post: Post): HomePostSummary => ({
  path: getPath(post.id, post.filePath),
  title: post.data.title,
  description: post.data.description,
  pubDatetime: post.data.pubDatetime.toISOString(),
  publishedDate: formatPublishedDate(post),
  categories: getHomePostCategories(post),
});
