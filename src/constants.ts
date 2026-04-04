import type { Props } from "astro";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconBilibili from "@/assets/icons/IconBilibili.svg";
import IconYoutube from "@/assets/icons/IconYoutube.svg";

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
    href: "https://x.com/masteralanlab",
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
    name: "YouTube",
    href: "https://www.youtube.com/@MasterAlanLab",
    linkTitle: "访问艾伦的 YouTube 频道",
    icon: IconYoutube,
    showInMinimalList: true,
  },
];

export const SOCIALS: SocialLink[] = AUTHOR_LINKS;
export const SHARE_LINKS: SocialLink[] = AUTHOR_LINKS;
