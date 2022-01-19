import clsx from "clsx";
import React, { useState } from "react";
import classes from "./BurgerMenu.module.scss";

export interface IMenuButtonProps {}
export const MenuButton: React.FC<IMenuButtonProps> = () => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={clsx(classes.menu_btn, active && classes.open)}
      onClick={() => {
        setActive((prev) => !prev);
      }}
    >
      <div className={classes.menu_btn__burger}></div>
    </div>
  );
};
