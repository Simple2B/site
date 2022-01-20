import clsx from "clsx";
import React, { useState } from "react";
import classes from "./BurgerMenu.module.scss";

export interface IMenuButtonProps {
  toggleMenu: () => void;
  isActive?: boolean;
}
export const MenuButton: React.FC<IMenuButtonProps> = ({toggleMenu: onClick, isActive}) => {
  return (
    <div
      className={clsx(classes.menu_btn, isActive && classes.open)}
      onClick={onClick}
    >
      <div className={classes.menu_btn__burger}></div>
    </div>
  );
};
