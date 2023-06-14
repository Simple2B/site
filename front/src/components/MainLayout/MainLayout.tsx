"use client";
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
      <Navbar openModal={openModal} />
      <main className="content">{children}</main>
      <Footer openModal={openModal} />
      <Modal isActive={modalActive} closeModal={closeModal}>
        <ModalContacts />
      </Modal>
    </>
  );
};
