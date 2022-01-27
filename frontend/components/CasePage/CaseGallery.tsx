import React, { CSSProperties } from "react";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import { ICaseCard } from "../../types/cases";
import classes from "./CasePage.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import clsx from "clsx";

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
            "_blank",
            "resizable=1"
          )
        }
      >
        <p className={clsx(classes.case__legend)}>{itm.legend}</p>
        <Image
          src={`/png/cases/${caseCard.imagePath}${itm.fileName}.png`}
          alt="Case illustration"
          width="1000"
          height="800"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    );
  });

  return (
    <div className={classes.slider__wrapper}>
      {/* <Carousel
        showThumbs={false}
        width={"100%"}
        onClickItem={(idx, item) => {
        }}
        selectedItem={0}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className={clsx(
                classes.slider__arrow,
                classes.slider__arrow_left
              )}
            >
              -
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className={clsx(
                classes.slider__arrow,
                classes.slider__arrow_right
              )}
            >
              +
            </button>
          )
        }
      >
        {slides}
      </Carousel> */}
      {slides}
    </div>
  );
};
