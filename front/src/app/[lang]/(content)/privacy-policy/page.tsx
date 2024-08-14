import React from 'react';
import { cookies } from 'next/headers';
import { EnPrivacyPolicy } from '@/components/PrivacyPolicy/EnPrivacyPolicy';
import { DePrivacyPolicy } from '@/components/PrivacyPolicy/DePrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy',
};


const Page = () => {
  const cookieStore = cookies();
  const lang = cookieStore.get('n18i')?.value ?? 'en';

  if (lang === 'de') {
    return <DePrivacyPolicy />
  }

  return (
    <EnPrivacyPolicy />
  )
}

export default Page;
