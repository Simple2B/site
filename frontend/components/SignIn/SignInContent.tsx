import React from "react";
import classes from "./SignInContent.module.scss";
import clsx from "clsx";
import Image from "next/image";

export interface ISignInContentProps {}
export const SignInContent: React.FC<ISignInContentProps> = ({}) => {
  return (
    <div className={clsx(classes.signinContent__wrapper)}>
      <p className={classes.signinContent__title}>Junior Full-stack Developer</p>
      <div className={classes.signinContent__text}>
        <p>Dear candidate!</p>
        <p>To apply for this vacancy we want to pass the Quiz.
        It consists of multiple choise questions and will take approximately 15min.</p>
        <p>Please log in with Github to continue.</p>
      </div>
      <button className={classes.signin_button}>
        <div className={clsx(classes.signin_button_items)}>
        <span className={clsx(classes.signin_button_logo)}>
        <Image
          src={`/svg/social/github.svg`}
          alt={`github_logo`}
          // layout="fill"
          objectFit="cover"
          quality={100}
          width={27}
      height={27}
        />
      </span>
      <span className={clsx(classes.signin_button_text)}>Sign in with Github</span>
        </div>
      </button>
    </div>
  );
};