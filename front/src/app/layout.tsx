import "./globals.scss";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Simple2B",
    default: "Simple2B", // a default is required when creating a template
  },
  openGraph: {
    title: "Simple2B",
    siteName: "Simple2B",
    description:
      "We help businesses to succeed through innovative and reliable solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple2B",
    description:
      "We help businesses to succeed through innovative and reliable solutions.",
    images: [`https://www.simple2b.net/png/logo.png`],
  },
  app: {
    name: "twitter_app",
    url: {
      iphone: "https://www.simple2b.net/",
      ipad: "https://www.simple2b.net/",
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
      {/* // TODO it */}
      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <meta
        property="og:image"
        content={`https://www.simple2b.net/png/logo.png`}
      />
      <meta property="og:email" content="simple2b.info@gmail.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;900&display=swap"
        rel="stylesheet"
      /> */}
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
