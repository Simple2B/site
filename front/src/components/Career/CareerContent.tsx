import { VacancyElement } from "../../types/vacancies";
import classes from "./Career.module.scss";
import { CareerCard } from "./CareerCard";

export interface ICareerContentProps {
  list: VacancyElement[];
}

export const CareerContent: React.FC<ICareerContentProps> = ({ list }) => {
  return (
    <div className={classes.wrapper}>
      {list.map((itm) => (
        <CareerCard key={itm.id} item={itm} />
      ))}
    </div>
  );
};
