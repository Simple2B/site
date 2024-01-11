'use client';

import clsx from 'clsx';
import classes from './CustomButton.module.scss';
import Image from 'next/image';

export interface ICustomButtonProps {
  onClick?: () => void;
  title?: string;
  type?: 'filled' | 'outlined' | 'none' | 'outlinedWithBackground';
  size?: 'small' | 'large' | 'smallForHeader';
  extraClasses?: string;
  status?: 'success' | 'fail' | 'normal' | 'disable';
  isNoHover?: boolean;
  disabled?: string;
  logo?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  emptyAnswer?: boolean;
}

export const CustomButton = ({
  extraClasses,
  type = 'outlined',
  size = 'small',
  title = 'Awesome Button',
  status = 'normal',
  isNoHover = false,
  onClick = () => {},
  logo,
  buttonType,
  emptyAnswer,
}: ICustomButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type={buttonType}
      disabled={status === 'disable'}
      className={clsx(
        classes.button,
        classes[`button_${size}`],
        classes[`button_${type}`],
        classes[`button_${status}`],
        extraClasses,
        isNoHover && classes.button_noHover,
        `${emptyAnswer ? 'animate-shakecus' : ''}`
      )}
      onClick={handleClick}
    >
      {logo && <Image width={27} height={27} src={logo} alt="sing in" />}

      {title}
    </button>
  );
};
