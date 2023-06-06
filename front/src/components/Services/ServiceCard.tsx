import React from "react";
import { IServiceCard } from "../../types/services";
import classes from "./ServiceCard.module.scss";
import Image from "next/image";

export interface IServiceCardProps {
  card: IServiceCard;
}
export const ServiceCard: React.FC<IServiceCardProps> = ({ card }) => {
  const Illustration = card.illustration;
  return (
    <div className={classes.service_card}>
      <div className={classes.service_card__illustration}>
        {/* <Illustration />  */}
        <Image
          alt="Rocket bee"
          src={`/svg/bees/${card.illustration}`}
          width="100"
          height="70"
          sizes="100vw"
          // layout="responsive"
          // objectFit="contain"
        />
      </div>
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
