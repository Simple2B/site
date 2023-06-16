"use client";

import { MouseEvent } from "react";
import clsx from "clsx";
import classes from "./Modal.module.scss";
import { useAppContext } from "@/context/state";

export interface IModalProps {
  children: JSX.Element | JSX.Element[];
}

export const Modal = ({ children }: IModalProps) => {
  const { closeModal, modalActive } = useAppContext();

  const handleStopCloseModal = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={clsx(
        classes.modal__wrapper,
        modalActive && classes.modal__wrapper_active
      )}
      onClick={closeModal}
    >
      <div
        className={clsx(
          classes.modal__content,
          modalActive && classes.modal__content_active
        )}
        onClick={handleStopCloseModal}
      >
        <div className={classes.modal__close} onClick={closeModal} />
        {children}
      </div>
    </div>
  );
};
