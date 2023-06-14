"use client";

import clsx from 'clsx';
import classes from './CustomButton.module.scss';

export interface ICustomButtonProps {
  onClick: () => void;
  title?: string;
  type?: 'filled' | 'outlined' | 'none' | 'outlinedWithBackground';
  size?: 'small' | 'large' | 'smallForHeader';
  extraClasses?: string;
  status?: 'success' | 'fail' | 'normal';
  isNoHover?: boolean;
}

export const CustomButton = ({
  extraClasses,
  type = 'outlined',
  size = 'small',
  title = 'Awesome Button',
  status = 'normal',
  isNoHover = false,
  onClick,
}: ICustomButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={clsx(
        classes.button,
        classes[`button_${size}`],
        classes[`button_${type}`],
        classes[`button_${status}`],
        extraClasses,
        isNoHover && classes.button_noHover,
      )}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
