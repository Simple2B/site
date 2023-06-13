import clsx from 'clsx';
import React, { useCallback } from 'react';
import classes from './Case.module.scss';

export interface ICaseChipProps {
  title: string;
  onClick: (filter: string, isActive?: boolean) => void;
  isActive?: boolean;
}

export const CaseChip: React.FC<ICaseChipProps> = ({ title, onClick, isActive }) => {
  const handleClick = useCallback(() => {
    onClick(title, !!isActive);
  }, [title, isActive]);

  return (
    <div className={clsx(classes.chip, isActive && classes.chip_active)} onClick={handleClick}>
      {title}
    </div>
  );
};
