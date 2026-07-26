import type { CollectionEntry } from "astro:content";
import groupPostsBy from "./groupPostsBy";

type Post = CollectionEntry<"blog">;

export interface CategoryGroup {
  category: string;
  categoryName: string;
  posts: Post[];
}

const getCategoryGroups = (posts: Post[]): CategoryGroup[] =>
  groupPostsBy(posts, post => post.data.categories).map(
    ({ slug, name, posts }) => ({
      category: slug,
      categoryName: name,
      posts,
    })
  );

export default getCategoryGroups;
