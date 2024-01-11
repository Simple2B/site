'use client';

import { useEffect, useState } from 'react';
import { CustomButton } from './CustomButton';
import { useAppContext } from '@/context/state';

const OpenModal = ({ btnText }: { btnText: string }) => {
  const { openModal, modalActive } = useAppContext();
  const [isMaunted, setIsMaunted] = useState(false);

  useEffect(() => {
    setIsMaunted(true);
    return () => {
      setIsMaunted(false);
    };
  }, []);

  const onClick = () => {
    if (modalActive) return;
    openModal();
  };

  return (
    <CustomButton
      onClick={onClick}
      title={btnText}
      type="outlinedWithBackground"
    />
  );
};

export { OpenModal };
