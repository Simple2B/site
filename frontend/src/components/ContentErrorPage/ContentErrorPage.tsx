import React, { useCallback } from 'react';
import { NextPage } from 'next';
import classes from './ContentErrorPage.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CustomButton } from '../Buttons/CustomButton';

const ContentErrorPage: NextPage = () => {
  const router = useRouter();

  const handleGoToMain = useCallback(() => {
    router.push('/');
  }, []);
  return (
    <div className={clsx(classes.errorPage__wrapper)}>
      <div className={classes.errorPage__imageContainer}>
        <span className={classes.errorPage__image_wrapper}>
          <Image
            src={'/svg/errorPage/404.svg'}
            alt={'github_logo'}
            objectFit='cover'
            quality={100}
            layout='fill'
            // width={239}
            // height={168}
          />
        </span>
      </div>
      <div className={classes.errorPage__textContainer}>
        <p className={classes.errorPage__title}>
          Oops!
          <br />
          Page not found!
        </p>
        <p className={classes.errorPage__text}>
          {"This page doesn't exits or was removed. We suggest you to go back to main"}
        </p>
        <CustomButton title={'Go to Main'} size='large' type={'filled'} onClick={handleGoToMain} />
      </div>
    </div>
  );
};

export default ContentErrorPage;
