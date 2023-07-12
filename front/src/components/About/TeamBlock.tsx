"use client";

import clsx from "clsx";
import classes from "./About.module.scss";
import Image from "next/image";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";

export interface ITeamBlockProps {
  team: {
    id: number;
    firstName: string;
    position: string;
    image: string;
  }[]
}

export const TeamBlock = ({ team }: ITeamBlockProps) => {
  return (
    <>
      {team.map(({ firstName, image, position, id }) => (
        <div key={id} className={clsx(classes.profile__wrapper)}>
          <span className={clsx(classes.profile__image)}>
            <Image
              priority={true}
              src={`${IMG_DOMAIN_SERVER}/gallery/team/${image}.jpg`}
              alt={`${firstName} photo`}
              width={100}
              height={100}
            // sizes="100vw"
            // style={{ width: "100%" }}
            />
          </span>
          <div className={classes.profile__text}>
            <h3 className={classes.profile__name}>{firstName}</h3>
            <h4 className={classes.profile__position}>{position.toUpperCase()}</h4>
          </div>
        </div>
      ))}

    </>
  );
};
