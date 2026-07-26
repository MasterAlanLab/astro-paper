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

// Google AdSense 配置。审核通过后：enabled 改为 true，
// 填入 client（ca-pub-XXXXXXXXXXXXXXXX）和各广告位的 slot ID，
// 并在 public/ads.txt 中放入 AdSense 提供的内容。
//
// 广告单元类型：在 AdSense 后台（广告 → 按广告单元 → 新建广告单元）
// 两个广告位都选「展示广告（Display ads）」，尺寸保持默认的「自适应（响应式）」。
// 本站广告代码使用 data-ad-format="auto" + data-full-width-responsive，
// 只与展示广告单元匹配；不要选「文章内嵌广告」「信息流广告」「Multiplex」，
// 它们需要另外的代码格式，填进来不会正常展示。
// 建议创建两个独立单元（如命名为「文章开头」「文章结尾」），方便分开看收益报表。
export const ADSENSE: {
  enabled: boolean;
  client: string;
  slots: {
    postTop: string; // 文章详情页开头（展示广告·自适应）
    postBottom: string; // 文章详情页结尾（展示广告·自适应）
  };
} = {
  enabled: false,
  client: "",
  slots: {
    postTop: "",
    postBottom: "",
  },
};
