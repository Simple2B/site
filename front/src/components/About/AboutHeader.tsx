import React from "react";
import classes from "./About.module.scss";
import Image from "next/image";

export interface IAboutHeaderProps {}
export const AboutHeader: React.FC<IAboutHeaderProps> = () => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.text}>
        We are software development company with 100+ projects performed. We
        know how to maximize business value and ensure sustainability with
        custom technical solutions. We are deliver hight-quality, stable,
        scalable and functional digital products.
      </p>
      <span className={classes.image}>
        <Image
          alt="List item icon"
          src={`/svg/bees/about.svg`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </span>
    </div>
  );
};
