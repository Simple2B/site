'use client';

import { CustomButton } from './CustomButton';

// Named OpenModal for historical reasons; scrolls to #contacts section instead of opening a modal
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
