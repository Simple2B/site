import Head from "next/head";
import React, { useState } from "react";
import { ModalContacts } from "../components/Contacts/ModalContacts";
import { Footer } from "../components/Footer/Footer";
import { Modal } from "../components/Modal/Modal";
import { Navbar } from "../components/Navbar/Navbar";
import { AppContext, useAppContext } from "../context/state";

export interface IMainLayoutProps {
  title?: string;
  host?: string;
}
export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  title = "Page",
  host,
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
          <meta name="twitter:title" content="Simple2B" />

          <meta property="og:site_name" content="Simple2B" />

          <meta
            property="og:image"
            content={`https://${host}/png/logo_white_bg.png`}
          />
          <meta
            name="twitter:image"
            content={`https://${host}/png/logo_white_bg.png`}
          />

          <meta
            property="og:description"
            content="We help businesses to succeed through innovative and reliable solutions."
          />
          <meta
            name="twitter:description"
            content="We help businesses to succeed through innovative and reliable solutions."
          />

          <meta property="og:type" content="website" />
          <meta property="og:email" content="simple2b.info@gmail.com" />
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:url" content={`https://${host}/`} />
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
