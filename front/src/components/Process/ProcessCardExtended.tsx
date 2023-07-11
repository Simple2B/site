import clsx from "clsx";
import classes from "./ProcessCardExtended.module.scss";
import mainClasses from "./ProcessCard.module.scss";
import Image from "next/image";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";
import { IProcessCardProps } from "./ProcessCardMain";

export const ProcessCardExtended = ({ card }: IProcessCardProps) => {
  const evenCard = card.id % 2 === 0;

  return (
    <div className={clsx(classes.wrapper, evenCard && classes.wrapper_reverse)}>
      <div className={classes.image}>
        <Image
          alt="List item icon"
          src={`${IMG_DOMAIN_SERVER}/process/${card.id}.svg`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div
        className={clsx(
          classes.block,
          card.id % 2 > 0 && classes.block,
          evenCard && classes.block_reverse
        )}
      >
        <h4
          className={clsx(
            classes.title,
            mainClasses[`process_card__title_${card.id}`]
          )}
        >
          {card.title}
        </h4>

        <h5 className={classes.subtitle}>{card.subtitle}</h5>

        <p className={classes.description}>{card.description}</p>
      </div>
    </div>
  );
};
