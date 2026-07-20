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
    tag: "hosting",
    title: "买 VPS 看这里",
    description: "收集了各大 VPS/主机的评测与优惠信息，帮助你选择最适合的服务器。",
    href: "/posts/vps-providers-comparison-collection",
    featured: true,
  },
  {
    tag: "vcc",
    title: "无需 KYC 的虚拟信用卡平台",
    description: "整理各大虚拟信用卡平台的费用，帮助你选择最适合的虚拟信用卡平台。",
    href: "/posts/virtual-card-platforms-collection",
    featured: true,
  },
];
