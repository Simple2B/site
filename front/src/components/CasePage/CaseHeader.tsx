import { ICaseCard } from "../../types/cases";
import classes from "./CasePage.module.scss";
import Image from "next/image";

export interface ICaseHeaderProps {
  caseCard: ICaseCard;
  content: {
    titleOne: string;
    titleTwo: string;
    titleThree: string;
    titleFour: string;
  };
}
export const CaseHeader: React.FC<ICaseHeaderProps> = ({
  caseCard,
  content,
}) => {
  return (
    <div className={classes.header__wrapper}>
      <div className={classes.header__text}>
        <h4 className={classes.header__chapter_title}>{content.titleOne}</h4>
        <p className={classes.header__chapter_text}>{caseCard.description}</p>
        <h4 className={classes.header__chapter_title}>{content.titleTwo}</h4>
        <p className={classes.header__chapter_text}>
          {caseCard.tags.join(", ")}
        </p>
        <h4 className={classes.header__chapter_title}>{content.titleThree}</h4>
        <p className={classes.header__chapter_text}>{caseCard.role}</p>
        {caseCard.projectLink && (
          <>
            <h4 className={classes.header__chapter_title}>
              {content.titleFour}
            </h4>
            <a
              href={caseCard.projectLink}
              className={classes.header__chapter_text}
              target={"_blank"}
              rel={"noreferrer"}
            >
              {caseCard.projectLink}
            </a>
          </>
        )}
      </div>
      <div className={classes.header__image}>
        <Image
          src={`/png/cases/${caseCard.imagePath}main.png`}
          alt="Case illustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};
