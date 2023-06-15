"use client";

import React, { useCallback } from "react";
import { VacancyElement } from "../../types/vacancies";
import classes from "./Career.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CustomButton } from "../Buttons/CustomButton";

export interface IVacancyProps {
  element: VacancyElement;
}
export const VacancyContent: React.FC<IVacancyProps> = ({ element }) => {
  const router = useRouter();
  const { data } = useSession();
  const handleApplyPosition = useCallback(() => {
    router.push(`${element.applyPath}`);
  }, [element.applyPath, router]);

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
          />
        </span>
        <span className={classes.card__property_text}>{itm.value}</span>
      </div>
    );
  });

  return (
    <div className={classes.vacancy__wrapper}>
      <div className={classes.vacancy__content}>
        <div className={classes.vacancy__content_properties}>{properties}</div>
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
      <div className={classes.vacancy__action}>
        <div className={classes.vacancy__action_properties}>{properties}</div>
        <CustomButton
          size="small"
          title={data || !element.isDeveloper ? "Apply" : "Sign In to apply"}
          onClick={handleApplyPosition}
          type="filled"
        />
      </div>
    </div>
  );
};
