import assert from "node:assert/strict";
import type { CollectionEntry } from "astro:content";
import { SITE } from "../src/config";
import { getPath } from "../src/utils/getPath";
import { getPostNavigation } from "../src/utils/getPostNavigation";
import getPostsByTag from "../src/utils/getPostsByTag";
import getTagGroups from "../src/utils/getTagGroups";
import {
  getHomeCategories,
  getHomePostCategories,
} from "../src/utils/homePosts";
import { isPostPublished } from "../src/utils/postFilter";
import { slugifyStr } from "../src/utils/slugify";

type Post = CollectionEntry<"blog">;

const makePost = (
  id: string,
  pubDatetime: Date,
  options: Partial<Post["data"]> = {}
) =>
  ({
    id,
    collection: "blog",
    filePath: `src/data/blog/${id}.md`,
    data: {
      author: SITE.author,
      pubDatetime,
      title: id,
      categories: ["未分类"],
      tags: ["others"],
      description: id,
      ...options,
    },
  }) as Post;

const tests: Array<[string, () => void]> = [
  [
    "filters drafts and scheduled posts consistently",
    () => {
      const now = Date.UTC(2026, 0, 1, 0, 0, 0);
      const futurePost = makePost("future", new Date(now + 60 * 60 * 1000));
      const nearFuturePost = makePost(
        "near-future",
        new Date(now + SITE.scheduledPostMargin - 1)
      );
      const draftPost = makePost("draft", new Date(now - 1000), {
        draft: true,
      });

      assert.equal(
        isPostPublished(futurePost, { now, includeScheduled: false }),
        false
      );
      assert.equal(
        isPostPublished(futurePost, { now, includeScheduled: true }),
        true
      );
      assert.equal(
        isPostPublished(nearFuturePost, { now, includeScheduled: false }),
        true
      );
      assert.equal(
        isPostPublished(draftPost, { now, includeScheduled: true }),
        false
      );
    },
  ],
  [
    "builds homepage filters from explicit multi-category metadata",
    () => {
      const aiGuide = makePost("ai-guide", new Date("2026-03-02"), {
        categories: ["AI", "技术教程"],
      });
      const vpsGuide = makePost("vps-guide", new Date("2026-03-01"), {
        categories: ["VPS", "技术教程", "技术教程"],
      });

      assert.deepEqual(getHomePostCategories(aiGuide), ["ai", "技术教程"]);
      const categories = getHomeCategories([aiGuide, vpsGuide]);
      assert.equal(categories.length, 3);
      assert.deepEqual(
        categories.find(category => category.filter === "ai"),
        { label: "AI", filter: "ai", count: 1 }
      );
      assert.deepEqual(
        categories.find(category => category.filter === "vps"),
        { label: "VPS", filter: "vps", count: 1 }
      );
      assert.deepEqual(
        categories.find(category => category.filter === "技术教程"),
        { label: "技术教程", filter: "技术教程", count: 2 }
      );
    },
  ],
  [
    "builds stable post paths",
    () => {
      assert.equal(
        getPath("guides/my-post", "src/data/blog/guides/my-post.md"),
        "/posts/guides/my-post"
      );
      assert.equal(
        getPath("my-post", "src/data/blog/my-post.md", false),
        "/my-post"
      );
    },
  ],
  [
    "slugifies Latin and non-Latin tags",
    () => {
      assert.equal(slugifyStr("E2E Testing"), "e2e-testing");
      assert.equal(slugifyStr("中文 标签"), "中文-标签");
    },
  ],
  [
    "returns bounded previous and next posts",
    () => {
      const posts = [
        makePost("newest", new Date("2026-03-03")),
        makePost("current", new Date("2026-03-02")),
        makePost("oldest", new Date("2026-03-01")),
      ];

      assert.deepEqual(getPostNavigation(posts, "newest"), {
        prevPost: null,
        nextPost: posts[1],
      });
      assert.deepEqual(getPostNavigation(posts, "current"), {
        prevPost: posts[0],
        nextPost: posts[2],
      });
      assert.deepEqual(getPostNavigation(posts, "missing"), {
        prevPost: null,
        nextPost: null,
      });
    },
  ],
  [
    "groups tags in one pass while preserving post order",
    () => {
      const older = makePost("older", new Date("2026-03-01"), {
        tags: ["AI", "工具"],
      });
      const newer = makePost("newer", new Date("2026-03-02"), {
        tags: ["AI"],
      });
      const groups = getTagGroups([older, newer]);
      const aiGroup = groups.find(group => group.tag === "ai");

      assert.deepEqual(
        aiGroup?.posts.map(post => post.id),
        ["newer", "older"]
      );
      assert.deepEqual(
        getPostsByTag([older, newer], "工具").map(post => post.id),
        ["older"]
      );
    },
  ],
];

for (const [name, run] of tests) {
  run();
  process.stdout.write(`✓ ${name}\n`);
}

process.stdout.write(`${tests.length} utility tests passed.\n`);
