import React from "react";
import { VacancyElement } from "../../types/vacancies";
import classes from "./Career.module.scss";
import Image from "next/image";
import { CustomButton } from "../Buttons/CustomButton";
import clsx from "clsx";

export interface IVacancyProps {
  element: VacancyElement;
}
export const VacancyContent: React.FC<IVacancyProps> = ({ element }) => {
  const createList = (items: string[]) => {
    return items.map((itm, idx) => {
      return (
        <li key={idx} className={classes.vacancy__text_item}>
          {itm}
        </li>
      );
    });
  };
  const properties = element.properties.map((itm, idx) => {
    return (
      <div
        key={idx}
        className={clsx(classes.card__property, classes.vacancy__property)}
      >
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
  return (
    <div className={classes.vacancy__wrapper}>
      <div className={classes.vacancy__content}>
        <h3 className={classes.vacancy__title}>Overview</h3>
        <p className={classes.vacancy__text}>{element.overview}</p>
        <h3 className={classes.vacancy__title}>Required Skills & Expertise:</h3>
        <ul className={classes.vacancy__text_list}>
          {createList(element.skills)}
        </ul>
        <h3 className={classes.vacancy__title}>What do we offer:</h3>
        <ul className={classes.vacancy__text_list}>
          {createList(element.offer)}
        </ul>
        <h3 className={classes.vacancy__title}>About us:</h3>
        <p className={classes.vacancy__text}>{element.about}</p>
      </div>
      <div className={classes.vacancy__action_wrapper}>
        <div className={classes.vacancy__action}>
          {properties}
          <CustomButton
            size="small"
            title="Apply"
            onClick={() => {}}
            type="filled"
          />
        </div>
      </div>
    </div>
  );
};
