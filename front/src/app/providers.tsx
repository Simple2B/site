"use client";

// import "../styles/globals.scss";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

interface IProviders {
  children: React.ReactNode;
}

function Providers({ children }: IProviders) {
  // const { pathname } = useRouter();

  // useEffect(() => {
  //   // some browsers (like safari) may require a timeout to delay calling this
  //   // function after a page has loaded; otherwise, it may not update the position
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  // useEffect(() => {
  //   document.body.className = pageProps.isBlocked ? "blocked" : "";
  // });

  return (
    // <SessionProvider session={pageProps.session}>
    <SessionProvider>{children}</SessionProvider>
    // </SessionProvider>
  );
}

export default Providers;
