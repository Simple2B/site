import Script from 'next/script';

const GoogleStatistics = () => {
  console.log('GoogleStatistics');
  return (
    <div>
      <Script>
        {`
          gtag('event', 'conversion', {'send_to': 'AW-11419862767/h0hDCKuF-vgYEO-NtcUq'});
        `}
      </Script>
    </div>
  );
};

export { GoogleStatistics };
