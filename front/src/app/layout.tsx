import "./styles/globals.css";
import Providers from "./providers";
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL("https://www.simple2b.com"),
  title: {
    template: "%s | Simple2B",
    default: "Simple2B", // a default is required when creating a template
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Simple2B",
    siteName: "Simple2B",
    description:
      "We help businesses to succeed through innovative and reliable solutions.",
    type: "website",
    images: ['https://www.simple2b.net/png/logo.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple2B",
    description:
      "We help businesses to succeed through innovative and reliable solutions.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning={true} */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
