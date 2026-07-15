import type { CollectionEntry } from "astro:content";
import getTagGroups from "./getTagGroups";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  getTagGroups(posts).find(group => group.tag === tag)?.posts ?? [];

export default getPostsByTag;
