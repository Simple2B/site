"use client";

import React, { useCallback } from "react";
import { ICaseCard } from "../../types/cases";
import classes from "./Case.module.scss";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export interface ICaseCardProps {
  card: ICaseCard;
}
export const CaseCard: React.FC<ICaseCardProps> = ({ card }) => {
  // const [isMobile, setIsMobile] = useState(false);

  const isPhone = useMediaQuery({
    query: "(max-width: 744px)",
  });

  // useEffect(() => {
  //   if (isPhone) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // }, [isPhone]);

  const phoneCard = useCallback(() => {
    return (
      <span className={classes.case_card__illustration}>
        <Image
          src={`/png/cases/${card.imagePath}${card.illustration}.png`}
          alt="xcv"
          width={500}
          height={315}
          //   layout="fill"
        />
      </span>
    );
  }, [card.illustration, card.imagePath]);

  if (isPhone) {
    return (
      <div className={classes.case_card}>
        {phoneCard()}
        <h4 className={classes.case_card__title}>{card.title}</h4>
      </div>
    );
  }

  return (
    <div className={classes.case_card}>
      <div className={classes.case_card__content}>
        <h4 className={classes.case_card__title}>{card.title}</h4>
        <p className={classes.case_card__description}>{card.description}</p>
      </div>
      {phoneCard()}
    </div>
  );
};
