import { GoogleAds } from "@/components";
import { GoogleAnalyticsTag } from "@/components/GoogleAnalytics/GoogleAnalytics";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import Providers from "./providers";
import "./styles/globals.css";
import CookieConsentBanner from "@/components/CookiesConsentBanner/CookiesConsentBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.simple2b.com"),
  description:
    "We help businesses to succeed through innovative and reliable solutions.",
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
    images: ["https://www.simple2b.net/png/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple2B",
    description:
      "We help businesses to succeed through innovative and reliable solutions.",
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    images: [`https://www.simple2b.net/png/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const lang = cookieStore.get("n18i")?.value || "en";
  const host = headers().get("host");
  const isGermany = !!host?.includes(".de");
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content={`width=${viewport.width}, initial-scale=${viewport.initialScale}`}
        />
        {/*
        // TODO: cookies consent banner from iubenda
        <Script type="text/javascript">
          {`var _iub = _iub || [];
          _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"enableFadp":true,"enableUspr":true,"fadpApplies":true,"floatingPreferencesButtonDisplay":"bottom-right","lang":"en","perPurposeConsent":true,"siteId":3703755,"usprApplies":true,"whitelabel":false,"cookiePolicyId":99766171, "banner":{"acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"ownerName":"www.simple2b.com/en","position":"float-top-center","rejectButtonDisplay":true,"showTitle":false,"showTotalNumberOfProviders":true }};`}
        </Script>
        <Script type="text/javascript" src="https://cs.iubenda.com/autoblocking/3703755.js" />
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js" />
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async /> */}

      </head>
      <body suppressHydrationWarning={true}>
        {process.env.NODE_ENV === "production" && (
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
        {process.env.NODE_ENV === "production" && <GoogleAnalyticsTag />}
        {process.env.NODE_ENV === "production" && isGermany && <GoogleAds />}
        <Providers>
          <div className="relative">
            {children}
            <CookieConsentBanner />
          </div>
        </Providers>

      </body>
    </html >
  );
}
