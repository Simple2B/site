import React from "react";
import Link from "next/link";
import { IMenu } from "../../types/menu";
import classes from "./Navbar.module.scss";
import clsx from "clsx";

export interface IMenuLinkProps {
  itm: IMenu;
  style?:string
}
export const MenuLink: React.FC<IMenuLinkProps> = ({ itm, style }) => {
  return (
    <Link href={itm.url}>
      <a className={clsx(classes.navbar__link, style)}>{itm.title}</a>
    </Link>
  );
};
