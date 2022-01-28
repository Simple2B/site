import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import classes from "./Gallery.module.scss";
import { GALLERY } from "../../types/gallery";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export interface IGalleryProps {}
export const Gallery: React.FC<IGalleryProps> = () => {
  const slides = GALLERY.map((itm, idx) => {
    return (
      <SplideSlide key={idx}>
        <div
          className={classes.slide}
          onClick={() => window.open(`/jpg/${itm}.jpg`, "_blank")}
        >
          <Image
            src={`/jpg/${itm}.jpg`}
            alt="Simple2B gallery"
            layout="fill"
            objectFit="cover"
            quality={60}
          />
        </div>
      </SplideSlide>
    );
  });

  return (
    <div className={classes.slider__wrapper}>
      <Splide
        options={{
          type: "fade",
          rewind: true,
          lazyLoad: "nearby",
        }}
      >
        {slides}
      </Splide>
    </div>
  );
};
