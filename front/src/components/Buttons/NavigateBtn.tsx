"use client";

import React from "react";
import { CustomButton } from "./CustomButton";
import { useRouter } from "next/navigation";

type Props = {
  pushTo: string;
  title: string;
};

const NavigateBtn = async ({ pushTo, title }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${pushTo}`);
  };

  return (
    <CustomButton size="small" title={title} onClick={onClick} type="filled" />
  );
};

export default NavigateBtn;
