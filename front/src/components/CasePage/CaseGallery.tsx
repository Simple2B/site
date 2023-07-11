"use client";

import Image from "next/image";
import classes from "./CasePage.module.scss";
import { ICaseCard } from "@/types/cases";
import { IMG_DOMAIN } from "@/app/constants";
export interface ICaseGalleryProps {
  caseCard: ICaseCard;
}

export const CaseGallery = ({ caseCard }: ICaseGalleryProps) => {

  const slides = caseCard.gallery.map((itm, idx) => {
    const onClick = () => {
      window.open(
        `${IMG_DOMAIN}/cases/${caseCard.imagePath}${itm.fileName}.png`,
        "_blank",
        "resizable=1"
      );
    };

    return (
      <div key={idx} className={classes.case__slide} onClick={onClick}>
        <Image
          src={`${IMG_DOMAIN}/cases/${caseCard.imagePath}${itm.fileName}.png`}
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
