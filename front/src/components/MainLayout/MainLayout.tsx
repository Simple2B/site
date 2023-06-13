"use client";
import Head from "next/head";
import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Modal } from "../Modal/Modal";
import { ModalContacts } from "../Contacts";
import { Footer } from "../Footer/Footer";
import { useAppContext } from "@/context/state";

export interface IMainLayoutProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
}
export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  title = "Page",
}) => {
  const { openModal, closeModal, modalActive } = useAppContext();

  return (
    <>
      {/* <Head>
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
      </Head> */}
      <Navbar openModal={openModal} />
      <main className="content">{children}</main>
      <Footer openModal={openModal} />
      <Modal isActive={modalActive} closeModal={closeModal}>
        <ModalContacts />
      </Modal>
    </>
  );
};
