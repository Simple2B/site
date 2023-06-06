'use client'

import clsx from 'clsx';
import React, { useMemo } from 'react';
import classes from './Accordion.module.scss';
import Image from 'next/image';
import { AccordionItem } from './AccordionItem';
import { OUR_TECHNOLOGIES } from '../../types/technologies';

export interface IAccordionProps {}
export const Accordion: React.FC<IAccordionProps> = () => {
  const items = useMemo(() => {
    return OUR_TECHNOLOGIES.map((item) => {
      return <AccordionItem key={item.id} item={item} />;
    });
  }, []);
  return <div className={clsx(classes.accordion__container)}>{items}</div>;
};
