import { socialLinks } from "@/types/contacts";
import classes from "./Contacts.module.scss";
import Image from "next/image";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";

export const SocialLinks: React.FC = () => {
  const items = socialLinks.map((item) => {
    if (!item.disabled) {
      return (
        <a
          key={item.id}
          target="_blank"
          rel="noreferrer"
          href={item.link}
          className={classes.contacts__social_item}
        >
          <Image
            alt="Rocket bee"
            src={`${IMG_DOMAIN_SERVER}/socials/${item.icon}.svg`}
            width="40"
            height="40"
            sizes="40vw"
          />
        </a>
      );
    }
  });
  return <div className={classes.contacts__social}>{items}</div>;
};
