import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  useEffect(() => {
    // some browsers (like safari) may require a timeout to delay calling this
    // function after a page has loaded; otherwise, it may not update the position
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.className = pageProps.isBlocked ? 'blocked' : '';
  });

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;