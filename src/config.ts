export const SITE = {
  website: "https://masteralanlab.pages.dev/", // replace this with your deployed domain
  author: "艾伦",
  profile: "https://x.com/masteralanlab",
  desc: "艾伦的技术博客，记录自动化脚本、实用工具、部署笔记与技术教程。",
  title: "艾伦的博客",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "编辑此页",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
