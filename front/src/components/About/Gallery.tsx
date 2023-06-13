"use client";

import React from "react";
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
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </SplideSlide>
    );
  });

  return (
    <div className={classes.slider__wrapper}>
      <Splide
        options={{
          type: "loop",
          speed: 650,
          padding: "15%",
          gap: "5rem",
          easing: "linear ",
        }}
      >
        {slides}
      </Splide>
    </div>
  );
};
