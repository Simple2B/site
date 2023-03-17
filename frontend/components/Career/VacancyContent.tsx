import React, { useCallback } from "react";
import { VacancyElement } from "../../types/vacancies";
import classes from "./Career.module.scss";
import Image from "next/image";
import { CustomButton } from "../Buttons/CustomButton";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { VacancyOut, VacancyType } from "../../pages/api/backend";

// export interface IVacancyProps {
//   element: VacancyElement;
// }

export interface IVacancyProps {
  element: VacancyOut;
}

export const VacancyContent: React.FC<IVacancyProps> = ({ element }) => {
  const router = useRouter();
  const session = useSession();

  const quizUrl = `/careers/${element.slug}/quiz`

  const handleApplyPosition = () => {
    if (session.status === "loading") return;
    if (session.status === "authenticated") {
      router.push(quizUrl);
      return;
    }
    router.push(`/auth/signin?callBackUrl=${quizUrl}`);
  };
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
          {createList(element.offers)}
        </ul>
        <h3 className={classes.vacancy__title}>About us:</h3>
        <p className={classes.vacancy__text}>{element.about}</p>
      </div>
      <div className={classes.vacancy__action_wrapper}>
        <div className={classes.vacancy__action}>
          {properties}
          {/* TODO Review it during the implementing 'quiz' */}
          {/* <CustomButton
            size="small"
            title={session.status === "authenticated"  ? "Apply" : "Sign In to apply"}
            onClick={handleApplyPosition}
            type="filled"
          /> */}
        </div>
      </div>
    </div>
  );
};
