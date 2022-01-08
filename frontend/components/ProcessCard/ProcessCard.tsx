import clsx from "clsx";
import React from "react";
import { IProcessCard } from "../../types/process";
import classes from "./ProcessCard.module.scss";

export interface IProcessCardProps {
  card: IProcessCard;
}
export const ProcessCard: React.FC<IProcessCardProps> = ({ card }) => {
  return (
    <div className={classes.process_card}>
      <h4
        className={clsx(
          classes.process_card__title,
          classes[`process_card__title_${card.id}`]
        )}
      >
        {card.title}
      </h4>
      <p className={classes.process_card__description}>{card.description}</p>
    </div>
  );
};
