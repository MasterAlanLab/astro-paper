import type { CollectionEntry } from "astro:content";
import groupPostsBy from "./groupPostsBy";

type Post = CollectionEntry<"blog">;

export interface TagGroup {
  tag: string;
  tagName: string;
  posts: Post[];
}

const getTagGroups = (posts: Post[]): TagGroup[] =>
  groupPostsBy(posts, post => post.data.tags).map(({ slug, name, posts }) => ({
    tag: slug,
    tagName: name,
    posts,
  }));

export default getTagGroups;
