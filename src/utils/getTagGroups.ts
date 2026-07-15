import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyStr } from "./slugify";

type Post = CollectionEntry<"blog">;

export interface TagGroup {
  tag: string;
  tagName: string;
  posts: Post[];
}

const getTagGroups = (posts: Post[]): TagGroup[] => {
  const tagGroups = new Map<string, TagGroup>();

  for (const post of getSortedPosts(posts)) {
    for (const tagName of post.data.tags) {
      const tag = slugifyStr(tagName);
      const tagGroup = tagGroups.get(tag);

      if (tagGroup) {
        tagGroup.posts.push(post);
      } else {
        tagGroups.set(tag, { tag, tagName, posts: [post] });
      }
    }
  }

  return [...tagGroups.values()].sort((a, b) => a.tag.localeCompare(b.tag));
};

export default getTagGroups;
