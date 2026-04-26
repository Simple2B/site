'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import classes from './BurgerMenu.module.scss';
import { IMG_DOMAIN } from '@/app/constants';

export const BurgerLogo = () => {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'en';
  return (
    <div>
      <div className={classes.burger__logo}>
        <Link href={`/${lang}`}>
          <Image
            src={`${IMG_DOMAIN}/logos/main_site_logo.svg`}
            alt="Simple2B logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </Link>
      </div>
    </div>
  );
};
