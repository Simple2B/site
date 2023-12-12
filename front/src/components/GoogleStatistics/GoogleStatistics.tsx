import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

const GoogleStatistics = () => {
  return (
    <div>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </div>
  );
};

export { GoogleStatistics };
