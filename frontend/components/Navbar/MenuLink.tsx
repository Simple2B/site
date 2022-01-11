import React from "react";
import Link from "next/link";
import { IMenu } from "../../types/menu";
import classes from "./Navbar.module.scss";

export interface IMenuLinkProps {
  itm: IMenu;
}
export const MenuLink: React.FC<IMenuLinkProps> = ({ itm }) => {
  return (
    <Link href={itm.url}>
      <a className={classes.navbar__link}>{itm.title}</a>
    </Link>
  );
};
