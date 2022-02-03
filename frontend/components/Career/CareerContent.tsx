import React, { useMemo } from "react";
import { VacancyElement } from "../../types/vacancies";
import classes from "./Career.module.scss";
import { CareerCard } from "./CareerCard";

export interface ICareerContentProps {
  list: VacancyElement[];
}
export const CareerContent: React.FC<ICareerContentProps> = ({ list }) => {
  const vacancies = useMemo(() => {
    return list.map((itm) => {
      return <CareerCard key={itm.id} item={itm} />;
    });
  }, []);
  return <div className={classes.wrapper}>{vacancies}</div>;
};
