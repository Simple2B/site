import Link from "next/link";
import Image from "next/image";

import { ICaseCard } from "@/types/cases";
import classes from "./Case.module.scss";
export interface ICaseCardProps {
  card: ICaseCard;
}
export const CaseCard = ({ card }: ICaseCardProps) => {
  return (
    <Link
      key={card.id}
      href={`/cases/${card.id}`}
      property={JSON.stringify(card.tags)}
      className={classes.case_card}
    >
      <div className={classes.case_card__content}>
        <h4 className={classes.case_card__title}>{card.title}</h4>
        <p className={classes.case_card__description}>{card.description}</p>
      </div>
      <span className={classes.case_card__illustration}>
        <Image
          src={`https://simple2b-site-static.s3.eu-north-1.amazonaws.com/${card.illustration}.png`}
          alt="xcv"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </span>
    </Link>
  );
};
