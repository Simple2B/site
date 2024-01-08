'use client';

import { CustomButton } from './CustomButton';
import { signOut, useSession } from 'next-auth/react';

const LoginQut = () => {
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

  return <CustomButton onClick={onClick} title="Login Out" />;
};

export default LoginQut;
