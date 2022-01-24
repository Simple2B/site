import clsx from "clsx";
import React from "react";
import { CustomButton } from "../Buttons/CustomButton";
import classes from "./HeaderSection.module.scss";
import RocketBee from "../../assets/svg/bee_rocket.svg";
import ChevronDown from "../../assets/svg/chevron_down.svg";
import Image from "next/image";

export interface IHeaderSectionProps {}
export const HeaderSection: React.FC<IHeaderSectionProps> = () => {
  return (
    <header className={clsx(classes.header)}>
      <div className="container">
        <div className={classes.header__wrapper}>
          <div className={classes.header__illustration}>
            <Image
              alt="Rocket bee"
              src={"/bee_rocket.svg"}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className={classes.header__content}>
            <p className={classes.header__description}>
              Sit sed neque tortor aliquet. Non viverra neque, eu et, lectus
              imperdiet id. Duis mauris urna sed pharetra velit. Integer
              placerat aliquam egestas ornare ut a. Eu nullam blandit enim
              ridiculus lectus lorem fermentum.
            </p>
            <CustomButton
              title="Get In Touch"
              size="large"
              type="filled"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      <span className={classes.header__arrow}>
        <ChevronDown />
      </span>
    </header>
  );
};
