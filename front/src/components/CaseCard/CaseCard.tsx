import Image from "next/image";

import { ICaseCard } from "@/types/cases";
import classes from "./Case.module.scss";

export interface ICaseCardProps {
  card: ICaseCard;
}
export const CaseCard = ({ card }: ICaseCardProps) => {
  return (
    <div className={classes.case_card}>
      <div className={classes.case_card__content}>
        <h4 className={classes.case_card__title}>{card.title}</h4>
        <p className={classes.case_card__description}>{card.description}</p>
      </div>
      <span className={classes.case_card__illustration}>
        <Image
          src={`/png/cases/${card.imagePath}${card.illustration}.png`}
          alt="xcv"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </span>
    </div>
  );
};
