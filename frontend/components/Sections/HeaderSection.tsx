import clsx from "clsx";
import React from "react";
import { CustomButton } from "../Buttons/CustomButton";
import classes from "./HeaderSection.module.scss";
import RocketBee from "../../assets/svg/bee_rocket.svg";
import ChevronDown from "../../assets/svg/chevron_down.svg";
import Image from "next/image";
import { useAppContext } from "../../context/state";

export interface IHeaderSectionProps {}
export const HeaderSection: React.FC<IHeaderSectionProps> = () => {
  const { openModal } = useAppContext();
  return (
    <header className={clsx(classes.header)}>
      <div className="container">
        <div className={classes.header__wrapper}>
          <div className={classes.header__illustration}>
            <Image
              alt="Rocket bee"
              src={"/svg/bees/bee_rocket.svg"}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className={classes.header__content}>
            <p className={classes.header__description}>
              We help businesses to succeed through innovative
              and reliable solutions.
            </p>
            <CustomButton
              title="Get In Touch"
              size="large"
              type="filled"
              onClick={openModal}
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
