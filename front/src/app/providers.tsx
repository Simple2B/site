'use client';

import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import { AppContext } from '@/context/state';
interface IProviders {
  children: React.ReactNode;
}

function Providers({ children }: IProviders) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  if (!isMounted) return null;

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
