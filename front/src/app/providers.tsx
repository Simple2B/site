'use client';

import { useEffect, useState } from 'react';
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
    <AppContext.Provider
      value={{
        modalActive: modalIsOpen,
        closeModal: handleCloseModal,
        openModal: handleOpenModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default Providers;
