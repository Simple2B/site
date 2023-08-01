import Link from "next/link";
import Image from "next/image";

import classes from "./Case.module.scss";
import { CaseOut } from "@/openapi";

export interface ICaseCardProps {
  card: CaseOut;
}

export const CaseCard = ({ card }: ICaseCardProps) => {
  return (
    <Link
      key={card.slug_name}
      href={`/cases/${card.slug_name}`}
      className={classes.case_card}
    >
      <div className={classes.case_card__content}>
        <h4 className={classes.case_card__title}>{card.title}</h4>
        <p className={classes.case_card__description}>{card.description}</p>
      </div>
      <span className={classes.case_card__illustration}>
        <Image
          src={card.title_image_url}
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
