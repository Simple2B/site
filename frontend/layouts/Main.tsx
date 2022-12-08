import Head from "next/head";
import React, { useState } from "react";
import { ModalContacts } from "../components/Contacts/ModalContacts";
import { Footer } from "../components/Footer/Footer";
import { Modal } from "../components/Modal/Modal";
import { Navbar } from "../components/Navbar/Navbar";
import { AppContext, useAppContext } from "../context/state";
export interface IMainLayoutProps {
  title?: string;
}
export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  title = "Page",
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          modalActive: modalIsOpen,
          closeModal: handleCloseModal,
          openModal: handleOpenModal,
        }}
      >
        <Head>
          <title>{title} | Simple2B</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta property="og:title" content="Simple2B" />
          <meta
            property="og:image"
            content="https://www.simple2b.net/svg/logo/logo_blck.svg"
          />
          <meta
            property="og:description"
            content="We help businesses to succeed through innovative and reliable solutions."
          />
        </Head>
        <Navbar />
        <main className="content">{children}</main>
        <Footer />
        <Modal isActive={modalIsOpen} closeModal={handleCloseModal}>
          <ModalContacts />
        </Modal>
      </AppContext.Provider>
    </>
  );
};
