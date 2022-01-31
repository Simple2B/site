import clsx from "clsx";
import React from "react";
import { IProcessCard } from "../../types/process";
import classes from "./ProcessCard.module.scss";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

export interface IProcessCardProps {
  card: IProcessCard;
}
export const ProcessCard: React.FC<IProcessCardProps> = ({ card }) => {
  const isTabletLower = useMediaQuery({
    query: "(min-width: 745px)",
  });
  const isTabletHigher = useMediaQuery({
    query: "(max-width: 1240px)",
  });

  return (
    <div
      className={clsx(
        classes.process_card__wrapper,
        card.id % 2 > 0 && classes.process_card__wrapper_left,
        card.id % 2 === 0 && classes.process_card__wrapper_right
      )}
    >
      {card.id % 2 === 0 && isTabletLower && isTabletHigher && (
        <span className={classes.process_card__decor_right}>
          <Image
            alt="decor"
            src={"/png/curved_line.png"}
            layout="responsive"
            width={260}
            height={170}
          />
        </span>
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
      {card.id % 2 > 0 && isTabletLower && isTabletHigher && (
        <span className={classes.process_card__decor_left}>
          <Image
            alt="decor"
            src={"/png/curved_line.png"}
            layout="responsive"
            width={260}
            height={170}
          />
        </span>
      )}
    </div>
  );
};
