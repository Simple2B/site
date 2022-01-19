import React from "react";
import classes from "./BurgerMenu.module.scss";
import { MenuButton } from "./MenuButton";

export interface IBurgerMenuProps {}
export const BurgerMenu: React.FC<IBurgerMenuProps> = () => {
  return (
    <nav role="navigation" className={classes.burger}>
      <MenuButton />
    </nav>
  );
};
