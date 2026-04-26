import { GoogleAnalyticsTag } from '@/components/GoogleAnalytics/GoogleAnalytics';
import { Metadata } from 'next';
import Script from 'next/script';
import Providers from './providers';
import './styles/globals.css';
import CookieConsentBanner from '@/components/CookiesConsentBanner/CookiesConsentBanner';

export const metadata: Metadata = {
  metadataBase: new URL('https://web.simple2b.com'),
  description:
    'We help businesses to succeed through innovative and reliable solutions.',
  title: {
    template: '%s | Simple2B',
    default: 'Simple2B',
  },
  openGraph: {
    title: 'Simple2B',
    siteName: 'Simple2B',
    description:
      'We help businesses to succeed through innovative and reliable solutions.',
    type: 'website',
    images: ['https://web.simple2b.com/png/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple2B',
    description:
      'We help businesses to succeed through innovative and reliable solutions.',
    images: ['https://web.simple2b.com/png/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content={`width=${viewport.width}, initial-scale=${viewport.initialScale}`}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              id="fraudblocker"
              type="text/javascript"
              strategy="beforeInteractive"
            >
              {`(function () {
            var s = document.createElement('script'),
              h = document.head;
            s.async = 1;
            s.src = 'https://monitor.fraudblocker.com/fbt.js?sid=HkqFwdGr2ozw2N-zRv8eL';
            h.appendChild(s);
          })()`}
            </Script>
            <noscript>
              <a href="https://fraudblocker.com" rel="nofollow">
                <img
                  src="https://monitor.fraudblocker.com/fbt.gif?sid=HkqFwdGr2ozw2N-zRv8eL"
                  alt="Fraud Blocker"
                />
              </a>
            </noscript>
          </>
        )}
        {process.env.NODE_ENV === 'production' && <GoogleAnalyticsTag />}
        <Providers>
          <div className="relative">
            {children}
            <CookieConsentBanner
              text="This site uses services that use cookies to deliver better
              experience and analyze traffic. You can learn more about the
              services we use at our"
              rejectText="Reject"
              aceeptText="Accept"
              privacyPolicy="Privacy Policy"
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
