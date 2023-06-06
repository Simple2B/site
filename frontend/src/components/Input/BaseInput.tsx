import clsx from 'clsx';
import React from 'react';
import classes from './BaseInput.module.scss';

export interface IBaseInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: string;
  type?: 'text' | 'email' | 'number' | 'tel';
  required?: boolean;
}
export const BaseInput: React.FC<IBaseInputProps> = ({ type = 'text', style, ...props }) => {
  return (
    <>
      <input type={type} {...props} className={clsx(classes.base, style)} />
    </>
  );
};
