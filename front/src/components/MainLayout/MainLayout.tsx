"use client";

import { AppContext } from "@/context/state";
import Head from "next/head";
import React, { useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Modal } from "../Modal/Modal";
import { ModalContacts } from "../Contacts";
import { Footer } from "../Footer/Footer";

export interface IMainLayoutProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
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
          <meta name="twitter:title" content="Simple2B" />

          <meta property="og:site_name" content="Simple2B" />

          <meta
            property="og:image"
            content={`https://www.simple2b.net/png/logo.png`}
          />
          <meta
            name="twitter:image"
            content={`https://www.simple2b.net/png/logo.png`}
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
          <meta name="twitter:url" content={`https://www.simple2b.net/`} />
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
