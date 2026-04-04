export type AffiliateItem = {
  tag: string;
  title: string;
  description: string;
  href: string;
  category: "建站工具" | "VPS/主机" | "效率工具" | "海外账号" | "AI";
  featured?: boolean;
};

export const AFFILIATES: AffiliateItem[] = [
  {
    tag: "bonus",
    title: "海外账号、电话卡、AI 会员购买",
    description: "一站式提供各种海外账号和AI会员购买服务。",
    href: "https://cutt.ly/dywt86NC",
    category: "海外账号",
    featured: true,
  },
  {
    tag: "ai",
    title: "满血 Claude & GPT中转站",
    description: "满血 Claude & GPT 中转站，佣金返还 90%，全网最高！",
    href: "https://cutt.ly/JywJG3G5",
    category: "AI",
    featured: true,
  },
  {
    tag: "hosting",
    title: "DMIT VPS",
    description: "中国优化线路 VPS，性能稳定，价格实惠。",
    href: "https://cutt.ly/YywJIzY0",
    category: "VPS/主机",
    featured: true,
  },
];
