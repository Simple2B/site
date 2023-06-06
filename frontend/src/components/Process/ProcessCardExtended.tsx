import React from 'react';
import { IProcessCardProps } from './ProcessCardMain';
import classes from './ProcessCardExtended.module.scss';
import mainClasses from './ProcessCard.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

export const ProcessCardExtended: React.FC<IProcessCardProps> = ({ card }) => {
  return (
    <div className={clsx(classes.wrapper, card.id % 2 === 0 && classes.wrapper_reverse)}>
      <span className={classes.image}>
        <Image
          alt='List item icon'
          src={`/svg/process/${card.id}.svg`}
          width='100%'
          height='100%'
          layout='responsive'
        />
      </span>
      <div
        className={clsx(
          classes.block,
          card.id % 2 > 0 && classes.block,
          card.id % 2 === 0 && classes.block_reverse,
        )}
      >
        <h4 className={clsx(classes.title, mainClasses[`process_card__title_${card.id}`])}>
          {card.title}
        </h4>
        <h5 className={classes.subtitle}>{card.subtitle}</h5>
        <p className={classes.description}>{card.description}</p>
      </div>
    </div>
  );
};
