"use client";

import { CustomButton } from "./CustomButton";
import { useAppContext } from "@/context/state";

const OpenModal = () => {
  const { openModal, modalActive } = useAppContext();

  const onClick = () => {
    if (modalActive) return;
    openModal();
  };

  return <CustomButton onClick={onClick} title="Contact Us" type="filled" />;
};

export { OpenModal };
