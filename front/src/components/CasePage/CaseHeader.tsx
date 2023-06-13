import React from 'react';
import { ICaseCard } from '../../types/cases';
import classes from './CasePage.module.scss';
import Image from 'next/image';

export interface ICaseHeaderProps {
  caseCard: ICaseCard;
}
export const CaseHeader: React.FC<ICaseHeaderProps> = ({ caseCard }) => {
  return (
    <div className={classes.header__wrapper}>
      <div className={classes.header__text}>
        <h4 className={classes.header__chapter_title}>Description</h4>
        <p className={classes.header__chapter_text}>{caseCard.description}</p>
        <h4 className={classes.header__chapter_title}>Tech stack</h4>
        <p className={classes.header__chapter_text}>{caseCard.tags.join(', ')}</p>
        <h4 className={classes.header__chapter_title}>Our role</h4>
        <p className={classes.header__chapter_text}>{caseCard.role}</p>
        {caseCard.projectLink && (
          <>
            <h4 className={classes.header__chapter_title}>Project link</h4>
            <a
              href={caseCard.projectLink}
              className={classes.header__chapter_text}
              target={'_blank'}
              rel={'noreferrer'}
            >
              {caseCard.projectLink}
            </a>
          </>
        )}
      </div>
      <div className={classes.header__image}>
        <Image
          //   src={`/png/cases/brunswick/main.png`}
          src={`/png/cases/${caseCard.imagePath}main.png`}
          alt='Case illustration'
          width={500}
          height={500}
          // layout='responsive'
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};
