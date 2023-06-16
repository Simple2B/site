"use client";

import React from "react";
import Image from "next/image";
import classes from "./CasePage.module.scss";
import { ICaseCard } from "@/types/cases";

export interface ICaseGalleryProps {
  caseCard: ICaseCard;
}
export const CaseGallery: React.FC<ICaseGalleryProps> = ({ caseCard }) => {
  const slides = caseCard.gallery.map((itm, idx) => {
    const onClick = () => {
      window.open(
        `/png/cases/${caseCard.imagePath}${itm.fileName}.png`,
        "_blank",
        "resizable=1"
      );
    };

    return (
      <div key={idx} className={classes.case__slide} onClick={onClick}>
        <Image
          src={`/png/cases/${caseCard.imagePath}${itm.fileName}.png`}
          alt="Case illustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    );
  });

  return <div className={classes.slider__wrapper}>{slides}</div>;
};
