import type { Props } from "astro";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconBilibili from "@/assets/icons/IconBilibili.svg";
import IconTikTok from "@/assets/icons/IconTikTok.svg";
import IconKuaishou from "@/assets/icons/IconKuaishou.svg";
import IconZhihu from "@/assets/icons/IconZhihu.svg";

export interface SocialLink {
  name: string;
  href: string;
  linkTitle: string;
  label?: string;
  icon?: (_props: Props) => Element;
  showInMinimalList?: boolean;
}

export const AUTHOR_LINKS: SocialLink[] = [
  {
    name: "X",
    label: "X / Twitter",
    href: "https://x.com/real_masteralan",
    linkTitle: "在 X / Twitter 上关注艾伦",
    icon: IconBrandX,
    showInMinimalList: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/MasterAlanLab",
    linkTitle: "访问艾伦的 Telegram 频道",
    icon: IconTelegram,
    showInMinimalList: true,
  },
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/3691004225914941",
    linkTitle: "访问艾伦的 Bilibili 空间",
    icon: IconBilibili,
    showInMinimalList: true,
  },
  {
    name: "抖音",
    href: "https://v.douyin.com/LzR5Sns8mQU",
    linkTitle: "访问艾伦的抖音主页",
    icon: IconTikTok,
    showInMinimalList: true,
  },
  {
    name: "快手",
    href: "https://www.kuaishou.com/profile/3x77ra8rcg7fpne",
    linkTitle: "访问艾伦的快手主页",
    icon: IconKuaishou,
    showInMinimalList: true,
  },
  {
    name: "知乎",
    href: "https://www.zhihu.com/people/ds3gaz7z",
    linkTitle: "访问艾伦的知乎主页",
    icon: IconZhihu,
    showInMinimalList: true,
  },
];

export const SOCIALS: SocialLink[] = AUTHOR_LINKS;
export const SHARE_LINKS: SocialLink[] = AUTHOR_LINKS;
