"use client";

import classes from "./SignInContent.module.scss";
import { CustomButton } from "../Buttons/CustomButton";
import { signIn } from "next-auth/react";

const SingBtn = () => {
  const onClick = () => {
    signIn("github", { callbackUrl: "/careers/quiz" });
  };

  return (
    <CustomButton
      logo="/svg/social/github.svg"
      isNoHover
      size="large"
      type="filled"
      title="Log In with GitHub"
      onClick={onClick}
      extraClasses={classes.signin_button}
    />
  );
};

export default SingBtn;
