import React from "react";
import Link from "next/link";
import { IMenu } from "../../types/menu";
import classes from "./Navbar.module.scss";
import clsx from "clsx";

export interface IMenuLinkProps {
  itm: IMenu;
  style?: string;
  callback?: () => void;
}
export const MenuLink: React.FC<IMenuLinkProps> = ({
  itm,
  style,
  callback,
}) => {
  // if ((itm.title = "Contacts")) {
  //   return (
  //     <a href="#contacts" className={clsx(classes.navbar__link, style)}>
  //       {itm.title}
  //     </a>
  //   );
  // }
  return (
    <Link href={itm.url}>
      <a className={clsx(classes.navbar__link, style)} onClick={callback}>
        {itm.title}
      </a>
    </Link>
  );
};
