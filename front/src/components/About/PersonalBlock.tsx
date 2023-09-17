import clsx from "clsx";
import classes from "./About.module.scss";
import Image from "next/image";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";

export interface IPersonalBlockProps {
  fullName: string;
  position: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export const PersonalBlock = ({
  description,
  fullName,
  image,
  position,
  reverse,
}: IPersonalBlockProps) => {
  return (
    <div
      className={clsx(
        classes.person__wrapper,
        reverse && classes.person__wrapper_reverse
      )}
    >
      <div
        className={clsx(
          classes.person__image,
          reverse && classes.person__image_reverse
        )}
      >
        <Image
          src={`${IMG_DOMAIN_SERVER}/gallery/leadership/${image}.jpg`}
          alt={`${fullName} photo`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority={true}
        />
      </div>

      <div className={classes.person__text}>
        <h3 className={classes.person__fullName}>{fullName}</h3>
        <h4 className={classes.person__position}>{position}</h4>
        <p className={classes.person__description}>{description}</p>
      </div>
    </div>
  );
};
