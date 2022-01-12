import React from "react";
import { ICaseCard } from "../../types/cases";
import classes from "./CaseCard.module.scss";
import Image from "next/image";

export interface ICaseCardProps {
  card: ICaseCard;
}
export const CaseCard: React.FC<ICaseCardProps> = ({ card }) => {
  const Img = card.illustration;
  return (
    <div className={classes.case_card}>
      <div className={classes.case_card__content}>
        <h4 className={classes.case_card__title}>{card.title}</h4>
        <p className={classes.case_card__description}>{card.description}</p>
      </div>
      <span className={classes.case_card__illustration}>
        {/* <Img /> */}
        <Image
          src={`/png/cases/${card.title.toLowerCase()}_img.png`}
          alt="xcv"
          width={500}
          height={315}
          //   layout="fill"
        />
      </span>
    </div>
  );
};
