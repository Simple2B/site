import clsx from "clsx";
import React from "react";
import { email } from "../../types/contacts";
import { menuList } from "../../types/menu";
import { useLockBodyScroll } from "../../lib/useLockBodyScroll";
import { CustomButton } from "../Buttons/CustomButton";
import { ContactLink } from "../Contacts/ContactLink";
import { MenuLink } from "../Navbar/MenuLink";
import classes from "./BurgerMenu.module.scss";
import { useAppContext } from "../../context/state";

export interface ISideMenuProps {
  toggleMenu: () => void;
  isActive?: boolean;
}
export const SideMenu: React.FC<ISideMenuProps> = ({
  isActive,
  toggleMenu,
}) => {
  useLockBodyScroll(!!isActive);
  const menuItems = menuList.map((itm) => (
    <MenuLink key={itm.id} itm={itm} callback={toggleMenu} />
  ));

  const { openModal } = useAppContext();

  return (
    <div
      id="mySidenav"
      className={clsx(classes.sidenav, isActive && classes.sidenav__active)}
    >
      <div className={classes.sidenav__wrapper}>
        {menuItems}
        <CustomButton
          title="Contact Us"
          onClick={() => {
            toggleMenu();
            openModal();
          }}
        />
        <span className={classes.sidenav__email}>
          <ContactLink link={email.link} text={email.text} />
        </span>
      </div>
    </div>
  );
};
