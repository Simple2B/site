import { IMG_DOMAIN_SERVER } from "@/app/constants-server";
import classes from "./About.module.scss";
import Image from "next/image";

export const AboutHeader = ({ content }: { content: string }) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.text}>{content}</p>

      <span className={classes.image}>
        <Image
          alt="List item icon"
          src={`${IMG_DOMAIN_SERVER}/about.svg`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          loading="eager"
        />
      </span>
    </div>
  );
};
