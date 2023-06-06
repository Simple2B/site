import React, { useState } from 'react';
import classes from './BurgerMenu.module.scss';
import { MenuButton } from './MenuButton';
import { SideMenu } from './SideMenu';

import Image from 'next/image';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import clsx from 'clsx';
import Link from 'next/link';

export interface IBurgerMenuProps {}
export const BurgerMenu: React.FC<IBurgerMenuProps> = () => {
  const [active, setActive] = useState(false);
  const handleToggleMenu = () => {
    setActive((prev) => !prev);
  };
  return (
    <nav role='navigation' className={classes.burger_navbar}>
      <MenuButton isActive={active} toggleMenu={handleToggleMenu} />
      <span className={classes.burger__logo}>
        {
          <Link href={'/'}>
              <Image
                src={`/svg/logo/logo_blck.svg`}
                alt='Simple2b logo'
                // layout='fill'
                // objectFit='cover'
                quality={100}
              />
          </Link>
        }
      </span>
      <SideMenu isActive={active} toggleMenu={handleToggleMenu} />
      <div className={clsx(classes.grey_bg, active && classes.grey_bg_active)}></div>
    </nav>
  );
};
