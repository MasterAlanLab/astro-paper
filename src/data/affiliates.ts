export type AffiliateItem = {
  tag: string;
  title: string;
  description: string;
  href: string;
  featured?: boolean;
};

export const AFFILIATES: AffiliateItem[] = [
  {
    tag: "bonus",
    title: "海外账号、电话卡、AI 会员购买",
    description: "一站式提供各种海外账号和AI会员购买服务。",
    href: "https://cutt.ly/dywt86NC",
    featured: true,
  },
  {
    tag: "shop",
    title: "艾伦の小店",
    description:
      "自营店铺，提供一手货源，博主信誉保证，售后无忧。",
    href: "/posts/vps-providers-comparison-collection",
    featured: true,
  },
  {
    tag: "ai",
    title: "艾伦のAI会员代付",
    description:
      "提供全网极具性价比的 AI 会员代付代充服务。",
    href: "https://ai.corouter.cc",
    featured: true,
  },
];
