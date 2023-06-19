"use client";

import clsx from 'clsx';
import classes from './CustomButton.module.scss';
import Image from 'next/image';

export interface ICustomButtonProps {
  onClick: () => void;
  title?: string;
  type?: 'filled' | 'outlined' | 'none' | 'outlinedWithBackground';
  size?: 'small' | 'large' | 'smallForHeader';
  extraClasses?: string;
  status?: 'success' | 'fail' | 'normal' | 'disable';
  isNoHover?: boolean;
  disabled?: string;
  logo?: string;
}

export const CustomButton = ({
  extraClasses,
  type = 'outlined',
  size = 'small',
  title = 'Awesome Button',
  status = 'normal',
  isNoHover = false,
  onClick,
  logo,
}: ICustomButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      disabled={status === 'disable'}
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
      {logo && (
        <Image
          width={27}
          height={27}
          src={logo}
          alt="sing in"
        />
      )}

      {title}
    </button>
  );
};
