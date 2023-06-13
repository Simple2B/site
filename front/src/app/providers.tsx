"use client";

// import "../styles/globals.scss";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

import { AppContext } from "@/context/state";
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

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  console.log(modalIsOpen, "modalIsOpen");
  const handleOpenModal = () => {
    console.log("open");
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <SessionProvider>
      <AppContext.Provider
        value={{
          modalActive: modalIsOpen,
          closeModal: handleCloseModal,
          openModal: handleOpenModal,
        }}
      >
        {children}
      </AppContext.Provider>
    </SessionProvider>
  );
}

export default Providers;
