"use client";

import clsx from "clsx";
import classes from "./ProcessCard.module.scss";

import { IProcessCard } from "@/types/process";
import { ProcessCardImage } from "./ProcessCardImage";

export interface IProcessCardProps {
  card: IProcessCard;
}

export const ProcessCard = ({ card }: IProcessCardProps) => {
  const evenCard = card.id % 2 === 0;
  const oddCard = card.id % 2 > 0;

  return (
    <div
      className={clsx(
        classes.process_card__wrapper,
        oddCard && classes.process_card__wrapper_left,
        evenCard && classes.process_card__wrapper_right
      )}
    >
      {evenCard && (
        <ProcessCardImage style={classes.process_card__decor_right} />
      )}

      <div className={clsx(classes.process_card)}>
        <h4
          className={clsx(
            classes.process_card__title,
            classes[`process_card__title_${card.id}`]
          )}
        >
          {card.title}
        </h4>

        <p className={classes.process_card__description}>{card.subtitle}</p>
      </div>

      {oddCard && (
        <ProcessCardImage style={classes.process_card__decor_left} />
      )}
    </div>
  );
};
