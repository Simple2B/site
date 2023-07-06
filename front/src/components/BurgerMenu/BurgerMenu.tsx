"use client";

import { useState } from "react";

import clsx from "clsx";
import classes from "./BurgerMenu.module.scss";

import { BurgerLogo } from "./BurgerLogo";
import { MenuButton } from "./MenuButton";
import { SideMenu } from "./SideMenu";
import { IMenuInclude } from "@/types/menu";

export const BurgerMenu = ({ menuLinks, contactUs }: IMenuInclude) => {
  const [active, setActive] = useState(false);

  const handleToggleMenu = () => {
    setActive((prev) => !prev);
  };

  return (
    <div role="navigation" className={classes.burger_navbar}>
      <MenuButton isActive={active} toggleMenu={handleToggleMenu} />

      <BurgerLogo />

      <SideMenu
        isActive={active}
        toggleMenu={handleToggleMenu}
        menuLinks={menuLinks}
        contactUs={contactUs}
      />

      <div
        className={clsx(classes.grey_bg, active && classes.grey_bg_active)}
      />
    </div>
  );
};
