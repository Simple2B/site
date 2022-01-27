import React from "react";
import classes from "./About.module.scss";
import Image from "next/image";
import clsx from "clsx";

export interface IAboutHeaderProps {}
export const AboutHeader: React.FC<IAboutHeaderProps> = () => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.text}>
        Egestas diam elit faucibus at feugiat scelerisque purus eu platea. Ipsum
        condimentum tristique laoreet pellentesque nunc, viverra. Euismod at
        non, iaculis et risus egestas gravida malesuada. Vitae cras natoque
        aliquam urna, nec nec risus integer vitae. Rhoncus at gravida interdum
        maecenas ornare volutpat nibh adipiscing. Mattis consectetur faucibus
        suspendisse auctor tempor volutpat. Massa enim feugiat ut sit purus. Id
        nec orci at elementum. At scelerisque pulvinar elementum, odio nunc,
        ipsum eu egestas. Commodo turpis faucibus leo at id a. Egestas diam elit
        faucibus at feugiat scelerisque purus eu platea. Ipsum condimentum
        tristique laoreet pellentesque nunc, viverra. Euismod at non, iaculis et
        risus egestas gravida malesuada. Vitae cras natoque aliquam urna, nec
        nec risus integer vitae. Rhoncus at gravida interdum maecenas ornare
        volutpat nibh adipiscing. Mattis consectetur faucibus suspendisse auctor
        tempor volutpat. Massa enim feugiat ut sit purus. Id nec orci at
        elementum. At scelerisque pulvinar elementum, odio nunc, ipsum eu
        egestas. Commodo turpis faucibus leo at id a.
      </p>
      <span className={classes.image}>
        <Image
          alt="List item icon"
          src={`/svg/bees/about.svg`}
          width="100%"
          height="100%"
          layout="responsive"
        />
      </span>
    </div>
  );
};
