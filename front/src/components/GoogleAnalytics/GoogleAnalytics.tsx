import { headers } from 'next/headers';
import Script from 'next/script';
import React from 'react';

const GA_DE_ADS_ID = process.env.GA_DE_ADS_ID;
const GA_COM_ANALYTICS_ID = process.env.GA_COM_ANALYTICS_ID;

type Props = {};

const GoogleAnalytics = (props: Props) => {
  const headersList = headers();
  const host = headersList.get('host') || '';

  const isCorrectHost = host.includes('.de') || host.includes('.com');

  const googleKey = host.includes('.de') ? GA_DE_ADS_ID : GA_COM_ANALYTICS_ID;

  if (!isCorrectHost) {
    return <></>;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleKey}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', \'${googleKey}\');
        `}
      </Script>
    </>
  );
};

export { GoogleAnalytics };
