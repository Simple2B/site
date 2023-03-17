import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { OpenAPI } from "./api/backend";

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL as string;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  useEffect(() => {
    // some browsers (like safari) may require a timeout to delay calling this
    // function after a page has loaded; otherwise, it may not update the position
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.className = pageProps.isBlocked ? "blocked" : "";
  });

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
