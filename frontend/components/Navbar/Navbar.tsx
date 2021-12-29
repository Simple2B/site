import clsx from "clsx";
import React from "react";
import classes from "./Navbar.module.scss";
import { menuList } from "../../types/menu";
import Link from "next/link";
import { CustomButton } from "../Buttons/CustomButton";

export interface INavbarProps {}
export const Navbar: React.FC<INavbarProps> = () => {
  const menuItems = menuList.map((itm) => {
    return (
      <Link key={itm.id} href={itm.url}>
        <a className={classes.navbar__link}>{itm.title}</a>
      </Link>
    );
  });
  return (
    <div className={clsx(classes.navbar)}>
      <div className="container">
        <div className={classes.navbar__wrapper}>
          <span className={classes.navbar__logo}>Logo</span>
          <div className={classes.navbar__controls}>
            <nav className={classes.navbar__list}>{menuItems}</nav>
            {/* TODO: add navbar button click handler */}
            <CustomButton title="Contact Us" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};
