import FacebookIcon from "../assets/svg/social/facebook.svg";
import LinkedInIcon from "../assets/svg/social/linkedin.svg";
import TelegramIcon from "../assets/svg/social/telegram.svg";
import TwitterIcon from "../assets/svg/social/twitter.svg";
import UpWorkIcon from "../assets/svg/social/upwork.svg";

export interface ISocialLink {
  id: number;
  link: string;
  icon: string;
  tooltip: string;
}

export const socialLinks: ISocialLink[] = [
  {
    id: 1,
    link: "#",
    icon: LinkedInIcon,
    tooltip: "linkedin",
  },
  {
    id: 2,
    link: "#",
    icon: FacebookIcon,
    tooltip: "facebook",
  },
  {
    id: 3,
    link: "#",
    icon: TwitterIcon,
    tooltip: "twitter",
  },
  {
    id: 4,
    link: "#",
    icon: UpWorkIcon,
    tooltip: "upWork",
  },
  {
    id: 5,
    link: "#",
    icon: TelegramIcon,
    tooltip: "telegram",
  },
];

export const email = "simple2b@gmail.com";
export const telegram = { link: "#", text: "@Simple2BBot" };
export const phone = { link: "tel:+380122234156", text: "+380 (12) 223 41 56" };
export const address = { city: "Kyiv", street: "Stepana Bandery Ave, 6" };
