"use client";

import React from "react";
import { CustomButton } from "./CustomButton";
import { signOut, useSession } from "next-auth/react";

type Props = {};

const LoginQut = (props: Props) => {
  const { data } = useSession();

  const isUser = data?.user;

  const onClick = () => {
    if (isUser) {
      signOut();
    }
  };

  if (!isUser) {
    return <div></div>;
  }

  return (
    <CustomButton
      onClick={onClick}
      title="Login Out"
      type="outlinedWithBackground"
    />
  );
};

export default LoginQut;
