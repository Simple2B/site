"use client";

import { useAppContext } from "@/context/state";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";

import clsx from "clsx";
import classes from "./BurgerMenu.module.scss";

import { MenuLink } from "../Navbar";
import { CustomButton } from "../Buttons/CustomButton";
import { ContactLink } from "../Contacts";

import { menuList } from "@/types/menu";
import { email } from "@/types/contacts";

export interface ISideMenuProps {
  toggleMenu: () => void;
  isActive?: boolean;
}

export const SideMenu = ({ isActive, toggleMenu }: ISideMenuProps) => {
  useLockBodyScroll(!!isActive);
  const { openModal } = useAppContext();

  const handleToggle = () => {
    toggleMenu();
    openModal();
  };

  const { sidenav, sidenav__active, sidenav__wrapper, sidenav__email } =
    classes;

  return (
    <div id="mySidenav" className={clsx(sidenav, isActive && sidenav__active)}>
      <div className={sidenav__wrapper}>
        {menuList.map((itm) => (
          <MenuLink key={itm.id} itm={itm} callback={toggleMenu} />
        ))}

        <CustomButton
          title="Contact Us"
          onClick={handleToggle}
          size="smallForHeader"
        />

        <div className={sidenav__email}>
          <ContactLink link={email.link} text={email.text} />
        </div>
      </div>
    </div>
  );
};
