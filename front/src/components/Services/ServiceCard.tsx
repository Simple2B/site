import classes from "./ServiceCard.module.scss";
import Image from "next/image";
import { IServiceCard } from "@/types/services";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";

export interface IServiceCardProps {
  card: IServiceCard;
}

export const ServiceCard = ({ card }: IServiceCardProps) => {
  return (
    <div className={classes.service_card}>
      <div className={classes.service_card__illustration}>
        <Image
          alt="Rocket bee"
          src={`${IMG_DOMAIN_SERVER}/${card.illustration}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
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
