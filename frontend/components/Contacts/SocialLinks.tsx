import React from "react";
import { socialLinks } from "../../types/contacts";
import classes from "./Contacts.module.scss";

export const SocialLinks: React.FC = () => {
  const items = socialLinks.map((item) => {
    let Icon = item.icon;
    return (
      <a key={item.id} href={item.link} className={classes.contacts__social_item}>
        <Icon />
      </a>
    );
  });
  return <div className={classes.contacts__social}>{items}</div>;
};
