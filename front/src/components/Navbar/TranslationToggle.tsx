'use client';
import { setLanguage } from '@/app/actions';
import { usePathname } from 'next/navigation';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';

type Props = {};

const TranslationToggle = (props: Props) => {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  const onClick = () => {
    setLanguage(pathname);
  };

  return (
    <ReactCountryFlag
      countryCode={isEnglish ? 'DE' : 'GB'}
      svg
      style={{
        width: '1.5em',
        height: '1.5em',
        cursor: 'pointer',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
};

export { TranslationToggle };
