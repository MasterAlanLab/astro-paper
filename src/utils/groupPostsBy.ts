import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyStr } from "./slugify";

type Post = CollectionEntry<"blog">;

export interface PostGroup {
  slug: string;
  name: string;
  posts: Post[];
}

const groupPostsBy = (
  posts: Post[],
  getNames: (post: Post) => string[]
): PostGroup[] => {
  const groups = new Map<string, PostGroup>();

  for (const post of getSortedPosts(posts)) {
    const seen = new Set<string>();

    for (const name of getNames(post)) {
      const slug = slugifyStr(name);
      if (seen.has(slug)) continue;
      seen.add(slug);

      const group = groups.get(slug);
      if (group) {
        group.posts.push(post);
      } else {
        groups.set(slug, { slug, name, posts: [post] });
      }
    }
  }

  return [...groups.values()].sort((a, b) => a.slug.localeCompare(b.slug));
};

export default groupPostsBy;
