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
  disabled: boolean;
}

export const socialLinks: ISocialLink[] = [
  {
    id: 1,
    link: "https://www.linkedin.com/company/simple2b",
    icon: LinkedInIcon,
    tooltip: "linkedin",
    disabled: false,
  },
  {
    id: 2,
    link: "https://www.facebook.com/Simple2B-109300384066487",
    icon: FacebookIcon,
    tooltip: "facebook",
    disabled: false,
  },
  {
    id: 3,
    link: "#",
    icon: TwitterIcon,
    tooltip: "twitter",
    disabled: true,
  },
  {
    id: 4,
    link: "https://www.upwork.com/ag/simple2b/",
    icon: UpWorkIcon,
    tooltip: "upWork",
    disabled: false,
  },
  {
    id: 5,
    link: "#",
    icon: TelegramIcon,
    tooltip: "telegram",
    disabled: true,
  },
];

export const email = {
  link: "mailto:simple2b.info@gmail.com",
  text: "simple2b.info@gmail.com",
};
export const telegram = { link: "#", text: "@Simple2BBot" };
export const phone = { link: "tel:+380122234156", text: "+380 (12) 223 41 56" };
export const address = { city: "Kyiv", street: "Stepana Bandery Ave, 6" };
