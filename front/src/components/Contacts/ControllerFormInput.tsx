'use client';

import clsx from 'clsx';
import classes from './Contacts.module.scss';
import baseClasses from '../Input/BaseInput.module.scss';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Inputs } from './ContactForm';

interface Props {
  control: Control<Inputs, string>;
  data?: string | null;
  error?: FieldError;
  name: 'name' | 'email' | 'phone';
  placeholder: string;
  type?: string;
  backgroundStyle?: boolean;
  textRequired?: string;
}

export const ControllerFormInput = ({
  name,
  placeholder,
  type,
  control,
  data,
  error,
  backgroundStyle,
  textRequired = 'This field is required',
}: Props) => {
  const inputStyle = [
    baseClasses.base,
    classes.form_input,
    backgroundStyle && classes.form_input_grey,
  ];

  return (
    <div className={classes.form__input_wrapper}>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <input
            onChange={onChange}
            defaultValue={data ? data : value}
            className={clsx(...inputStyle)}
            placeholder={placeholder}
            type={type}
          />
        )}
      />

      {error && (
        <span className={classes.form__input_error}>{textRequired}</span>
      )}
    </div>
  );
};
