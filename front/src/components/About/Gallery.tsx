import "@splidejs/splide/dist/css/splide.min.css";

import Image from "next/image";
import classes from "./Gallery.module.scss";
import { GALLERY } from "@/types/gallery";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const SPLIDE_OPTION = {
  type: "loop",
  speed: 650,
  padding: "15%",
  gap: "5rem",
  easing: "linear ",
}

export const Gallery = () => {
  return (
    <div className={classes.slider__wrapper}>
      <Splide
        options={SPLIDE_OPTION}
      >
        {GALLERY.map(({ id, photo }) => (
          <SplideSlide key={id}>
            <div
              className={classes.slide}
              onClick={() => window.open(`/jpg/${photo}.jpg`, "_blank")}
            >
              <Image
                src={`/jpg/${photo}.jpg`}
                alt="Simple2B gallery"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
