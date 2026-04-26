'use client';

import { CustomButton } from './CustomButton';

const OpenModal = ({ btnText }: { btnText: string }) => {
  const onClick = () => {
    const el = document.getElementById('contacts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
