import React from "react";
import classes from "./SignInContent.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { CustomButton } from "../Buttons/CustomButton";

export interface ISignInContentProps {}
export const SignInContent: React.FC<ISignInContentProps> = ({}) => {
  return (
    <div className={clsx(classes.signinContent__wrapper)}>
      <div className={classes.signinContent__text}>
        <p>Dear candidate!</p>
        <p>
          To apply for this vacancy we want to pass the Quiz. It consists of
          multiple choise questions and will take approximately 15min.
        </p>
        <p>Please log in with Github to continue.</p>
      </div>
      <div className={classes.signin_button_container}>
        <img
          className={classes.signin_button_image}
          src="/svg/social/github.svg"
          alt="sing in"
        ></img>
        <CustomButton
          isNoHover
          size="large"
          type="filled"
          title="Log In with GitHub"
          onClick={() => {}}
          extraClasses={classes.signin_button}
        ></CustomButton>
      </div>
    </div>
  );
};
