import React from "react";
import { IServiceCard } from "../../types/services";
import classes from "./ServiceCard.module.scss";

export interface IServiceCardProps {
  card: IServiceCard;
}
export const ServiceCard: React.FC<IServiceCardProps> = ({ card }) => {
  const Illustration = card.illustration;
  return (
    <div className={classes.service_card}>
      <span className={classes.service_card__illustration}>
        <Illustration />
      </span>
      <h4 className={classes.service_card__title}>{card.title}</h4>
      <ul>
        {card.description.map((itm, idx) => (
          <li className={classes.service_card__listItem} key={idx}>
            {itm}
          </li>
        ))}
      </ul>
    </div>
  );
};
