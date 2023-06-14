"use client";

import Link from 'next/link';
import classes from './Navbar.module.scss';
import clsx from 'clsx';
import { IMenu } from '@/types/menu';

export interface IMenuLinkProps {
  itm: IMenu;
  style?: string;
  callback?: () => void;
}

export const MenuLink = ({ itm, style, callback }: IMenuLinkProps) => {
  return (
    <Link href={itm.url}>
      <div className={clsx(classes.navbar__link, style)} onClick={callback}>
        {itm.title}
      </div>
    </Link>
  );
};
