import type { CollectionEntry } from "astro:content";
import getTagGroups from "./getTagGroups";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  return getTagGroups(posts).map<Tag>(({ tag, tagName }) => ({ tag, tagName }));
};

export default getUniqueTags;
