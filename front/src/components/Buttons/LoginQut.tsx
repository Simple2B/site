"use client";

import { CustomButton } from "./CustomButton";
import { signOut, useSession } from "next-auth/react";

type Props = {
  btnText: string;
};

const LoginQut = ({ btnText }: Props) => {
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
    <span
      onClick={onClick}
      className="text-black"
    >Logout</span>
  );
};

export default LoginQut;
