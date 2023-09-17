"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";

import { AppContext } from "@/context/state";
interface IProviders {
  children: React.ReactNode;
}

function Providers({ children }: IProviders) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
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
