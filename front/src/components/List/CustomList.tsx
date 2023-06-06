'use client'

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { OUR_MISSION } from '../../types/services';
import Image from 'next/image';
import classes from './CustomList.module.scss';

export interface ICustomListProps {
  list: string[];
  icon?: 'done' | 'pin';
  isAboutSection?: boolean;
}
export const CustomList: React.FC<ICustomListProps> = ({ list, icon = 'done', isAboutSection }) => {
  const items = useMemo(
    () =>
      list.map((item, idx) => {
        return (
          <li key={idx} className={classes.item}>
            <span className={classes.item__icon}>
              <Image
                alt='List item icon'
                src={`/svg/list_item_${icon}_24.svg`}
                width='24'
                height='24'
                sizes='24vw'
              />
            </span>
            <span className={classes.item__text}>{item}</span>
          </li>
        );
      }),
    [],
  );

  return <ul className={clsx(classes.list, isAboutSection && classes.list_width)}>{items}</ul>;
};
