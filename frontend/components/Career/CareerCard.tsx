import React from "react";
import classes from "./Career.module.scss";
import Image from "next/image";
import Link from "next/link";
import { VacancyElement } from "../../types/vacancies";
import { VacancyOut } from "../../pages/api/backend";

export interface ICareerCardProps {
  item: VacancyOut;
}
export const CareerCard: React.FC<ICareerCardProps> = ({ item }) => {
  const properties = item.properties.map((itm, idx) => {
    return (
      <div key={idx} className={classes.card__property}>
        <span className={classes.card__property_icon}>
          <Image
            src={`/svg/icons/${itm.title}_24.svg`}
            alt="Icon"
            width={24}
            height={24}
            layout="fixed"
            objectFit="contain"
          />
        </span>
        <span className={classes.card__property_text}>{itm.value}</span>
      </div>
    );
  });

  console.log(item.slug, "item.slug")

  return (
    <Link href={`/careers/${item.slug}`}>
      <a className={classes.card__wrapper}>
        <h3 className={classes.card__title}>{item.title.toUpperCase()}</h3>
        <div className={classes.card__properties}>{properties}</div>
      </a>
    </Link>
  );
};
