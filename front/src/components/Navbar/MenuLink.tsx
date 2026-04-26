"use client";

import Link from 'next/link';
import classes from './Navbar.module.scss';
import clsx from 'clsx';
import { IMenu } from '@/types/menu';
import { usePathname } from 'next/navigation';

export interface IMenuLinkProps {
  itm: IMenu;
  style?: string;
  callback?: () => void;
}

export const MenuLink = ({ itm, style, callback }: IMenuLinkProps) => {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'en';

  // Anchor and external links pass through unchanged; internal links get lang prefix
  const href = itm.url.startsWith('#') || itm.url.startsWith('http')
    ? itm.url
    : `/${lang}${itm.url}`;

  return (
    <Link href={href}>
      <div className={clsx(classes.navbar__link, style)} onClick={callback}>
        {itm.title}
      </div>
    </Link>
  );
};
