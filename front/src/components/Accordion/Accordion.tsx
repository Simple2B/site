"use client";

import clsx from 'clsx';
import classes from './Accordion.module.scss';
import { OUR_TECHNOLOGIES } from '@/types/technologies';
import { AccordionItem } from './AccordionItem';

export const Accordion = () => {
  return (
    <div className={clsx(classes.accordion__container)}>
      {OUR_TECHNOLOGIES.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
};
