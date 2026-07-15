import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";
import { getPath } from "./getPath";

type Post = CollectionEntry<"blog">;

const homePostGroupTags = {
  tools: ["API", "VPS", "Claude", "Google Play", "反向代理", "中转"],
  ai: ["AI", "Claude", "Codex", "Agent", "Workflow"],
  building: ["API", "VPS", "反向代理", "中转", "日本", "评测"],
  vps: ["VPS"],
} as const;

const normalizedGroupTags = Object.fromEntries(
  Object.entries(homePostGroupTags).map(([group, tags]) => [
    group,
    new Set(tags.map(tag => tag.toLowerCase())),
  ])
) as Record<keyof typeof homePostGroupTags, Set<string>>;

export interface HomePostSummary {
  path: string;
  title: string;
  description: string;
  pubDatetime: string;
  publishedDate: string;
  groups: string[];
}

export const getHomePostGroups = (post: Post) =>
  Object.entries(normalizedGroupTags)
    .filter(([, tags]) =>
      post.data.tags.some(tag => tags.has(tag.toLowerCase()))
    )
    .map(([group]) => group);

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
  groups: getHomePostGroups(post),
});
