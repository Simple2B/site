import React from "react";
import classes from "./Career.module.scss";
import { CareerCard } from "./CareerCard";

export interface ICareerContentProps {}
export const CareerContent: React.FC<ICareerContentProps> = () => {
  return (
    <div className={classes.wrapper}>
      <CareerCard />
      <CareerCard />
    </div>
  );
};
