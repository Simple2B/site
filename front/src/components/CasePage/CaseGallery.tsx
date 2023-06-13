import React, { CSSProperties } from 'react';
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/splide/dist/css/splide.min.css";
import Image from 'next/image';
import { ICaseCard } from '../../types/cases';
import classes from './CasePage.module.scss';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import clsx from 'clsx';

export interface ICaseGalleryProps {
  caseCard: ICaseCard;
}
export const CaseGallery: React.FC<ICaseGalleryProps> = ({ caseCard }) => {
  const slides = caseCard.gallery.map((itm, idx) => {
    return (
      <div
        key={idx}
        className={classes.case__slide}
        onClick={() =>
          window.open(
            `/png/cases/${caseCard.imagePath}${itm.fileName}.png`,
            '_blank',
            'resizable=1',
          )
        }
      >
        <Image
          src={`/png/cases/${caseCard.imagePath}${itm.fileName}.png`}
          alt='Case illustration'
          // width={16}
          // height={9}
          // layout="responsive"
          // objectFit="contain"
          fill
          style={{ objectFit: 'contain' }}
          quality={60}
        />
      </div>
    );
  });

  return <div className={classes.slider__wrapper}>{slides}</div>;
};
