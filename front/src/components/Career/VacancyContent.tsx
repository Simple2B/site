import { VacancyElement } from "../../types/vacancies";
import classes from "./Career.module.scss";
import Image from "next/image";
import clsx from "clsx";
import BtnApply from "./Apply";

export interface IVacancyProps {
  element: VacancyElement;
}
export const VacancyContent: React.FC<IVacancyProps> = async ({ element }) => {
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
        className="flex items-center mr-14 tablet-max:mr-0 mb-5 tablet-max:basis-1/2"
      >
        <span className="w-6 h-6 mr-2">
          <Image
            src={`/svg/icons/${itm.title}_24.svg`}
            alt="Icon"
            width={24}
            height={24}
          />
        </span>
        <span className="font-normal text-lg leading-8 text-[#2e2e2e]">{itm.value}</span>
      </div>
    );
  });

  return (
    <div className={classes.vacancy__wrapper}>
      <div className={classes.vacancy__content}>
        <div className="flex flex-wrap tablet-min:hidden">{properties}</div>
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
        <BtnApply />
      </div>
    </div>
  );
};
