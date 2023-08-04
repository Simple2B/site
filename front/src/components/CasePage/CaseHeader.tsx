import classes from "./CasePage.module.scss";
import Image from "next/image";
import { CaseOut } from "@/openapi";

export interface ICaseHeaderProps {
  caseCard: CaseOut;
  content: {
    titleOne: string;
    titleTwo: string;
    titleThree: string;
    titleFour: string;
  };
}

export const CaseHeader = ({ caseCard, content }: ICaseHeaderProps) => {
  const main_image = caseCard.case_images.find(image => image.type_of_image === "case_main_image")!;

  return (
    <div className={classes.header__wrapper}>
      <div className={classes.header__text}>
        <h4 className={classes.header__chapter_title}>{content.titleOne}</h4>
        <p className={classes.header__chapter_text}>{caseCard.description}</p>
        <h4 className={classes.header__chapter_title}>{content.titleTwo}</h4>
        <p className={classes.header__chapter_text}>
          {caseCard.stacks.join(", ")}
        </p>
        <h4 className={classes.header__chapter_title}>{content.titleThree}</h4>
        <p className={classes.header__chapter_text}>{caseCard.role}</p>
        {caseCard.project_link && (
          <>
            <h4 className={classes.header__chapter_title}>
              {content.titleFour}
            </h4>
            <a
              href={caseCard.project_link}
              className={classes.header__chapter_text}
              target={"_blank"}
              rel={"noreferrer"}
            >
              {caseCard.project_link}
            </a>
          </>
        )}
      </div>
      <div className={classes.header__image}>
        <Image
          src={main_image.url}
          alt="Case illustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          loading="eager"
        />
      </div>
    </div>
  );
};
