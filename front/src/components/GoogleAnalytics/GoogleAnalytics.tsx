import { headers } from 'next/headers';
import React from 'react';
// import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'

const GA_DE_ADS_ID = process.env.GA_DE_ADS_ID;
const GA_COM_ANALYTICS_ID = process.env.GA_COM_ANALYTICS_ID;

type Props = {};

const GoogleAnalyticsTag = (props: Props) => {
  const headersList = headers();
  const host = headersList.get('host') || '';

  const isCorrectHost = host.includes('.de') || host.includes('.com');

  const googleKey = host.includes('.de') ? GA_DE_ADS_ID : GA_COM_ANALYTICS_ID;

  if (!isCorrectHost) {
    return <></>;
  }

  return (
      <GoogleAnalytics gaId={googleKey as string}/>
  );
};

export { GoogleAnalyticsTag };
