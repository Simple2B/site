'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const TranslationToggle = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isEnglish = pathname.startsWith('/en');

  // Swap lang prefix in current path so the user lands on the same page in the other language
  const onClick = () => {
    const newPath = isEnglish
      ? pathname.replace(/^\/en/, '/de')
      : pathname.replace(/^\/de/, '/en');
    router.push(newPath);
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
