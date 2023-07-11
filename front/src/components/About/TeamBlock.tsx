import clsx from "clsx";
import classes from "./About.module.scss";
import Image from "next/image";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";

export interface ITeamBlockProps {
  firstName: string;
  position: string;
  image: string;
}

export const TeamBlock = ({
  firstName,
  image,
  position,
}: ITeamBlockProps) => {
  return (
    <div className={clsx(classes.profile__wrapper)}>
      <span className={clsx(classes.profile__image)}>
        <Image
          src={`${IMG_DOMAIN_SERVER}/gallery/team/${image}.jpg`}
          alt={`${firstName} photo`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </span>
      <div className={classes.profile__text}>
        <h3 className={classes.profile__name}>{firstName}</h3>
        <h4 className={classes.profile__position}>{position.toUpperCase()}</h4>
      </div>
    </div>
  );
};
