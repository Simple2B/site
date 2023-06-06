import React from 'react';
import classes from './SignInContent.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { CustomButton } from '../Buttons/CustomButton';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

export interface ISignInContentProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}
export const SignInContent: React.FC<ISignInContentProps> = ({ providers }) => {
  // console.log("providers", providers["github"]);
  const githubProvider = providers ? providers['github'] : null;
  return (
    <div className={clsx(classes.signinContent__wrapper)}>
      <div className={classes.signinContent__text}>
        <p>Dear candidate!</p>
        <p>
          To apply for this vacancy we want you to pass the Quiz. It consists of multiple choice
          questions and will take approximately 15 min.
        </p>
        <p>Please log in with Github to continue.</p>
      </div>
      <div className={classes.signin_button_container}>
        <img
          className={classes.signin_button_image}
          src='/svg/social/github.svg'
          alt='sing in'
        ></img>
        <CustomButton
          isNoHover
          size='large'
          type='filled'
          title='Log In with GitHub'
          onClick={() => {
            if (githubProvider) signIn(githubProvider.id, { callbackUrl: '/careers' });
          }}
          extraClasses={classes.signin_button}
        ></CustomButton>
      </div>
    </div>
  );
};
