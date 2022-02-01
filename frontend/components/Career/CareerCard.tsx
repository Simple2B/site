import React from "react";
import classes from "./Career.module.scss";
import Image from "next/image";
import Link from "next/link";

export interface ICareerCardProps {}
export const CareerCard: React.FC<ICareerCardProps> = () => {
  return (
    <Link href={"/careers/1"}>
      <a className={classes.card__wrapper}>
        <h3 className={classes.card__title}>
          {"Junior FULL-STACK DEVELOPER".toUpperCase()}
        </h3>
        <div className={classes.card__properties}>
          <div className={classes.card__property}>
            <span className={classes.card__property_icon}>
              <Image
                src={`/svg/icons/location_24.svg`}
                alt="Icon"
                width={24}
                height={24}
                layout="fixed"
                objectFit="contain"
              />
            </span>
            <span className={classes.card__property_text}>Kyiv</span>
          </div>
          <div className={classes.card__property}>
            <span className={classes.card__property_icon}>
              <Image
                src={`/svg/icons/schedule_24.svg`}
                alt="Icon"
                width={24}
                height={24}
                layout="fixed"
                objectFit="contain"
              />
            </span>
            <span className={classes.card__property_text}>Full-time</span>
          </div>
          <div className={classes.card__property}>
            <span className={classes.card__property_icon}>
              <Image
                src={`/svg/icons/schedule_24.svg`}
                alt="Icon"
                width={24}
                height={24}
                layout="fixed"
                objectFit="contain"
              />
            </span>
            <span className={classes.card__property_text}>Full-time</span>
          </div>
          <div className={classes.card__property}>
            <span className={classes.card__property_icon}>
              <Image
                src={`/svg/icons/schedule_24.svg`}
                alt="Icon"
                width={24}
                height={24}
                layout="fixed"
                objectFit="contain"
              />
            </span>
            <span className={classes.card__property_text}>Full-time</span>
          </div>
        </div>
      </a>
    </Link>
  );
};
