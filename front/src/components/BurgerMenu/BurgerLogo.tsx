'use client';

import Link from 'next/link';
import Image from 'next/image';
import classes from './BurgerMenu.module.scss';
import { IMG_DOMAIN } from '@/app/constants';

export const BurgerLogo = () => {
  return (
    <div>
      <div className={classes.burger__logo}>
        <Link href={'/'}>
          <Image
            src={`${IMG_DOMAIN}/logos/main_site_logo.svg`}
            alt="Simple2b logo"
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
