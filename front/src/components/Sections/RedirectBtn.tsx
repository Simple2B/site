"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { CustomButton } from "../Buttons/CustomButton";

type Props = {
  redirectTo: string;
  title: string;
  type: "outlined" | "filled" | "none" | "outlinedWithBackground";
};

const RedirectBtn = ({ redirectTo, title, type }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'en';

  const handleAllCasesClick = () => {
    const isExternal = redirectTo.includes("http");
    if (isExternal) {
      document.location.href = redirectTo;
      return;
    }
    router.push(`/${lang}/${redirectTo}`);
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
