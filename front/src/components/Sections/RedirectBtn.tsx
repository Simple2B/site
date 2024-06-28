"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { CustomButton } from "../Buttons/CustomButton";

type Props = {
  redirectTo: string;
  title: string;
  type: "outlined" | "filled" | "none" | "outlinedWithBackground";
};

const RedirectBtn = ({ redirectTo, title, type }: Props) => {
  const router = useRouter();

  const handleAllCasesClick = () => {
    const isExternal = redirectTo.includes("http");
    if (isExternal) {
      document.location.href = redirectTo;
      return;
    }
    router.push(`/${redirectTo}`);
  };



  return (
    <CustomButton
      title={title}
      size="large"
      onClick={handleAllCasesClick}
      type={type}
    />
  );
};

export { RedirectBtn };
