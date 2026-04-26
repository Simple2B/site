import React from 'react';
import { EnPrivacyPolicy } from '@/components/PrivacyPolicy/EnPrivacyPolicy';
import { DePrivacyPolicy } from '@/components/PrivacyPolicy/DePrivacyPolicy';
import { i18n } from '@/i18n/i18n-config';

export const metadata = {
  title: 'Privacy Policy',
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

interface PageParams {
  params: { lang: string };
}

const Page = ({ params }: PageParams) => {
  if (params.lang === 'de') {
    return <DePrivacyPolicy />;
  }
  return <EnPrivacyPolicy />;
};

export default Page;
