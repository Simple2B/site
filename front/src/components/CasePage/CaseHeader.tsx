import classes from './CasePage.module.scss';
import Image from 'next/image';
import { CaseOut } from '@/openapi';

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
  return (
    <div className={classes.header__wrapper}>
      <div className={classes.header__text}>
        <h4 className={classes.header__chapter_title}>{content.titleOne}</h4>
        <p className={classes.header__chapter_text}>{caseCard.description}</p>
        <h4 className={classes.header__chapter_title}>{content.titleTwo}</h4>
        <p className={classes.header__chapter_text}>
          {caseCard.stacksNames.join(', ')}
        </p>
        <h4 className={classes.header__chapter_title}>{content.titleThree}</h4>
        <p className={classes.header__chapter_text}>{caseCard.role}</p>
        {caseCard.projectLink && (
          <>
            <a
              href="caseCard.projectLink"
              className={classes.header__chapter_title}
              target={'_blank'}
              rel={'noreferrer'}
            >
              {content.titleFour}
            </a>
          </>
        )}
      </div>
      <div className={classes.header__image}>
        <Image
          src={caseCard.mainImageUrl}
          alt="Case illustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          loading="eager"
        />
      </div>
    </div>
  );
};
