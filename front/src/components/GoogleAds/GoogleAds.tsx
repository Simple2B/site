import Script from 'next/script';

const GoogleAds = () => {
  return (
    <Script id="google-ads-page" strategy="beforeInteractive">
      {`
          gtag('event', 'conversion', {'send_to': 'AW-11419862767/h0hDCKuF-vgYEO-NtcUq'});
        `}
    </Script>
  );
};

export { GoogleAds };
