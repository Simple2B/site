import clsx from "clsx";
import React from "react";
import classes from "./Modal.module.scss";

export interface IModalProps {
  isActive: boolean;
  closeModal: () => void;
}
export const Modal: React.FC<IModalProps> = ({
  isActive,
  closeModal,
  children,
}) => {
  return (
    <div
      className={clsx(
        classes.modal__wrapper,
        isActive && classes.modal__wrapper_active
      )}
      onClick={closeModal}
    >
      <div
        className={clsx(
          classes.modal__content,
          isActive && classes.modal__content_active
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={classes.modal__close} onClick={closeModal}></div>
        {children}
      </div>
    </div>
  );
};
