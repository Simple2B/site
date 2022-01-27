import React, { useState } from "react";
import classes from "./BurgerMenu.module.scss";
import { MenuButton } from "./MenuButton";
import { SideMenu } from "./SideMenu";
import LogoBlack from "../../assets/svg/logo/logo_blck.svg";
import navbarClasses from "../Navbar/Navbar.module.scss";
import Image from "next/image";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import clsx from "clsx";

export interface IBurgerMenuProps {}
export const BurgerMenu: React.FC<IBurgerMenuProps> = () => {
  const [active, setActive] = useState(false);
  const handleToggleMenu = () => {
    setActive((prev) => !prev);
  };
  return (
    <nav role="navigation" className={classes.burger_navbar}>
      <MenuButton isActive={active} toggleMenu={handleToggleMenu} />
      <span className={classes.burger__logo}>
        <Image alt="Logo" src={"/png/logo_blck.png"} width={60} height={60} />
      </span>
      <SideMenu isActive={active} toggleMenu={handleToggleMenu} />
      <div
        className={clsx(classes.grey_bg, active && classes.grey_bg_active)}
      ></div>
    </nav>
  );
};
