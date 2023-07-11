"use client";

import { useState } from "react";
import Image from "next/image";

import clsx from "clsx";
import classes from "./HeaderSection.module.scss";

import { IMG_DOMAIN } from "@/app/constants";

import { CustomButton } from "../Buttons/CustomButton";
import { useAppContext } from "../../context/state";

export interface IHeaderSectionProps {
  description: string;
}

export const HeaderSection = ({ description }: IHeaderSectionProps) => {
  const { openModal } = useAppContext();
  const [mouseCoordX, setMouseCoordX] = useState(0);
  const [mouseCoordY, setMouseCoordY] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLHeadingElement>) => {
    setMouseCoordX(event.clientX);
    setMouseCoordY(event.clientY);
  };

  const setMouseMoveCoords = (coordX: number, coordY: number) => {
    return { transform: `translate(${coordX}px, ${coordY}px)` };
  };

  return (
    <header className={clsx(classes.header)}>
      <div className="container" onMouseMove={handleMouseMove}>
        <div className={classes.header__wrapper}>
          <div className={classes.header__illustration}>
            <Image
              alt="Rocket bee"
              src={`${IMG_DOMAIN}/others/bee_rocket.svg`}
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
              loading="eager"
            />
          </div>

          <div className={classes.parallax}>
            <div
              className={classes.parallax__dust1}
              style={setMouseMoveCoords(mouseCoordX / 2, mouseCoordY / 10)}
            ></div>

            <div
              className={classes.parallax__dust2}
              style={setMouseMoveCoords(mouseCoordX / 3, mouseCoordY / 5)}
            ></div>

            <div
              className={classes.parallax__dust3}
              style={setMouseMoveCoords(mouseCoordX / 4, mouseCoordY / 3)}
            ></div>
          </div>

          <div className={classes.header__content}>
            <p className={classes.header__description}>{description}</p>
            <CustomButton
              title="Get In Touch"
              size="large"
              type="filled"
              onClick={openModal}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
