import clsx from 'clsx';
import React from 'react';
import { ourServices } from '../../types/services';
import commonClasses from '../Sections/CommonSection.module.scss';
import classes from './ServiceHeader.module.scss';

import { ServiceCard } from './ServiceCard';

export interface IServiceHeaderProps {}
export const ServiceHeader: React.FC<IServiceHeaderProps> = () => {
  return (
    <>
      <p className={classes.services__intro}>
        Your professional partner on a path from an idea to the application and beyond.
      </p>
      <div className={clsx(classes.services__cards)}>
        {ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
      </div>
    </>
  );
};
