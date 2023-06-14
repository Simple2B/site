"use client";

import { useAppContext } from "@/context/state";
import { useMediaQuery } from "react-responsive";

import { Navbar } from "../Navbar/Navbar";
import { Modal } from "../Modal/Modal";
import { ModalContacts } from "../Contacts";
import { Footer } from "../Footer/Footer";
import { BurgerMenu } from "../BurgerMenu";

export interface IMainLayoutProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
}
export const MainLayout = ({
  children,
  title = "Page",
}: IMainLayoutProps) => {
  const { openModal, closeModal, modalActive } = useAppContext();

  const isPhone = useMediaQuery({
    query: "(max-width: 744px)",
  });

  return (
    <>
      {isPhone ? <BurgerMenu /> : <Navbar openModal={openModal} />}

      <main className="content">{children}</main>

      <Footer openModal={openModal} />

      <Modal isActive={modalActive} closeModal={closeModal}>
        <ModalContacts />
      </Modal>
    </>
  );
};
