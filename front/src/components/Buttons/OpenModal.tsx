"use client";

import { CustomButton } from "./CustomButton";
import { useAppContext } from "@/context/state";

const OpenModal = ({ btnText }: { btnText: string }) => {
  const { openModal, modalActive } = useAppContext();

  const onClick = () => {
    if (modalActive) return;
    openModal();
  };

  return (
    <CustomButton
      onClick={onClick}
      title={btnText}
      type="outlinedWithBackground"
    />
  );
};

export { OpenModal };
