import React from 'react';
import Script from 'next/script';

const GA_COM_ANALYTICS_ID = process.env.GA_COM_ANALYTICS_ID;

const GoogleAnalyticsTag = () => {
  if (!GA_COM_ANALYTICS_ID) return <></>;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_COM_ANALYTICS_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_COM_ANALYTICS_ID}');
        `}
      </Script>
    </>
  );
};

export { GoogleAnalyticsTag };
