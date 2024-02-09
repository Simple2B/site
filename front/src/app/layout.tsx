import { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import './styles/globals.css';
import Providers from './providers';
import { GoogleAnalyticsTag } from '@/components/GoogleAnalytics/GoogleAnalytics';
import { GoogleAds } from '@/components';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.simple2b.com'),
  description:
    'We help businesses to succeed through innovative and reliable solutions.',
  title: {
    template: '%s | Simple2B',
    default: 'Simple2B', // a default is required when creating a template
  },
  openGraph: {
    title: 'Simple2B',
    siteName: 'Simple2B',
    description:
      'We help businesses to succeed through innovative and reliable solutions.',
    type: 'website',
    images: ['https://www.simple2b.net/png/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple2B',
    description:
      'We help businesses to succeed through innovative and reliable solutions.',
    images: [`https://www.simple2b.net/png/logo.png`],
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
  const cookieStore = cookies();
  const lang = cookieStore.get('n18i')?.value || 'en';
  const host = headers().get('host');
  const isGermany = !!host?.includes('.de');
  return (
    <html lang={lang}>
      <body suppressHydrationWarning={true}>
        {process.env.NODE_ENV === 'production' && <GoogleAnalyticsTag />}
        {process.env.NODE_ENV === 'production' && isGermany && <GoogleAds />}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
