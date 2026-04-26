import Link from 'next/link';
import Image from 'next/image';

import classes from './Case.module.scss';
import type { CaseData } from '@/types/data';


export interface ICaseCardProps {
  card: CaseData;
  lang?: string;
}

export const CaseCard = ({ card, lang = 'en' }: ICaseCardProps) => {
  return (
    <Link
      key={card.slugName}
      href={`/${lang}/cases/${card.slugName}`}
      className={classes.case_card}
    >
      <div className={classes.case_card__content}>
        <h4 className={classes.case_card__title}>{card.title}</h4>
        <p className={classes.case_card__description}>{card.description}</p>
      </div>
      <div className={classes.case_card__illustration}>
        <Image
          src={card.previewImageUrl}
          alt="xcv"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </Link>
  );
};
