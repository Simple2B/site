"use client";

import Image from "next/image";
import classes from "./CasePage.module.scss";
import { CaseOut } from "@/openapi";
export interface ICaseGalleryProps {
  caseCard: CaseOut;
}

export const CaseGallery = ({ caseCard }: ICaseGalleryProps) => {
  const slides = caseCard.images.map((itm, idx) => {
    const onClick = () => {
      window.open(itm, "_blank", "resizable=1");
    };

    return (
      <div key={idx} className={classes.case__slide} onClick={onClick}>
          <Image
            src={itm}
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
