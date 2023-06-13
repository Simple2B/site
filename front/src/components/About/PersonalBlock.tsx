import React from "react";
import classes from "./About.module.scss";
import Image from "next/image";
import clsx from "clsx";

export interface IPersonalBlockProps {
  fullName: string;
  position: string;
  description: string;
  image: string;
  reverse?: boolean;
}
export const PersonalBlock: React.FC<IPersonalBlockProps> = ({
  description,
  fullName,
  image,
  position,
  reverse,
}) => {
  return (
    <div
      className={clsx(
        classes.person__wrapper,
        reverse && classes.person__wrapper_reverse
      )}
    >
      <span
        className={clsx(
          classes.person__image,
          reverse && classes.person__image_reverse
        )}
      >
        <Image
          src={`/jpg/team/${image}.jpg`}
          alt={`${fullName} photo`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </span>
      <div className={classes.person__text}>
        <h3 className={classes.person__fullName}>{fullName}</h3>
        <h4 className={classes.person__position}>{position}</h4>
        <p className={classes.person__description}>{description}</p>
      </div>
    </div>
  );
};
