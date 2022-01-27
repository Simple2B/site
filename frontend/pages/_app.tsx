import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.className = pageProps.isBlocked ? 'blocked' : '';
});
  return <Component {...pageProps} />;
}

export default MyApp;
