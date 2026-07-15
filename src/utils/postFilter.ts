import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

type Post = CollectionEntry<"blog">;

type PublicationOptions = {
  includeScheduled?: boolean;
  now?: number;
};

export const isPostPublished = (
  { data }: Post,
  {
    includeScheduled = import.meta.env.DEV,
    now = Date.now(),
  }: PublicationOptions = {}
) => {
  const isPublishTimePassed =
    now >= new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;

  return !data.draft && (includeScheduled || isPublishTimePassed);
};

const postFilter = (post: Post) => isPostPublished(post);

export default postFilter;
