import Script from 'next/script';

const GoogleStatistics = () => {
  return (
    <div>
      <Script id="google-analytics-page">
        {`
          gtag('event', 'conversion', {'send_to': 'AW-11419862767/h0hDCKuF-vgYEO-NtcUq'});
        `}
      </Script>
    </div>
  );
};

export { GoogleStatistics };
