import React from "react";
import { NextPage } from "next";
import classes from "./ContentErrorPage.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { CustomButton } from "../Buttons/CustomButton";

const ContentErrorPage500: NextPage = () => {
  return (
    <div className={clsx(classes.errorPage500__wrapper)}>
      <span className={classes.errorPage500__image_wrapper}>
        <Image
          src={`/svg/errorPage/500.svg`}
          alt={`github_logo`}
          // layout="fill"
          objectFit="cover"
          quality={100}
          width={661}
          height={429}
        />
        <p className={classes.errorPage500__imageContainer_number}>500</p>
      </span>

      <div className={classes.errorPage500__textContainer}>
        <p className={classes.errorPage500__title}>Server error!</p>
        <p className={classes.errorPage500__text}>
          Try to refresh this page or feel free to contact us if the problem
          persists.
        </p>
      </div>
    </div>
  );
};

export default ContentErrorPage500;
