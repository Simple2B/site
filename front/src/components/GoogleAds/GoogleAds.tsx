import Script from 'next/script';

const GoogleAds = () => {
  return (
    <div>
      {process.env.NODE_ENV === 'production' && (
        <Script id="google-ads-page">
          {`
          gtag('event', 'conversion', {'send_to': 'AW-11419862767/h0hDCKuF-vgYEO-NtcUq'});
        `}
        </Script>
      )}
    </div>
  );
};

export { GoogleAds };
