'use client';

import { useAppContext } from '@/context/state';
import { useLockBodyScroll } from '@/lib/useLockBodyScroll';

import clsx from 'clsx';
import classes from './BurgerMenu.module.scss';

import { MenuLink } from '../Navbar';
import { CustomButton } from '../Buttons/CustomButton';

import { IMenuInclude } from '@/types/menu';
import { email } from '@/types/contacts';

export interface ISideMenuProps extends IMenuInclude {
  toggleMenu: () => void;
  isActive?: boolean;
}

export const SideMenu = ({
  isActive,
  toggleMenu,
  menuLinks,
  contactUs,
}: ISideMenuProps) => {
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
        {menuLinks.map((itm) => (
          <MenuLink key={itm.id} itm={itm} callback={toggleMenu} />
        ))}

        <CustomButton
          title={contactUs}
          onClick={handleToggle}
          size="smallForHeader"
        />

        <div className={sidenav__email}>
          <a href={email.link}>
            <span>{email.text}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
