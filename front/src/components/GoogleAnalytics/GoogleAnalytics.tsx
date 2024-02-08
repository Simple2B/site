import { headers } from 'next/headers';
import React from 'react';
// import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';

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

  // <GoogleAnalytics gaId={googleKey as string}/>
  return (
    <div className="container">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleKey}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${googleKey});
        `}
      </Script>
    </div>
  );
};

export { GoogleAnalyticsTag };
