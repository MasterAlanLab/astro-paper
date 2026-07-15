import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

export function getPostNavigation(posts: Post[], currentPostId: string) {
  const currentPostIndex = posts.findIndex(post => post.id === currentPostId);

  if (currentPostIndex < 0) {
    return { prevPost: null, nextPost: null };
  }

  return {
    prevPost: currentPostIndex > 0 ? posts[currentPostIndex - 1] : null,
    nextPost:
      currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null,
  };
}
