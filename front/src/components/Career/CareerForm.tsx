"use client";

import { useEffect, useState } from 'react';
import { BaseInput } from '../Input/BaseInput';
import classes from './Career.module.scss';
import formClasses from '../Contacts/Contacts.module.scss';
import { CustomButton } from '../Buttons/CustomButton';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { VacancyElement } from '../../types/vacancies';

export interface ICareerFormProps {
  vacancy: VacancyElement;
  userId: number;
}
export const CareerForm = ({ vacancy, userId }: ICareerFormProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const { data } = useSession();
  // console.log("data :>> ", data);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value.slice(-1)) !== 0) {
      if (!parseInt(e.target.value.slice(-1)) && e.target.value.length > 0) return;
    }
    setPhone(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSendMessage = async () => {
    router.push('/careers');
  };

  useEffect(() => {
    if (data) {
      setEmail(data.user?.email!);
      setName(data.user?.name!);
    }
  }, [data]);

  const title = true
    ? 'Thank you for completing the Quiz!'
    : 'Thank you for applying for our position!';
  return (
    <div className={classes.career_form}>
      <h3 className={classes.career_form__title}>{title}</h3>
      <h4 className={classes.career_form__sub_title}>
        Please leave your contacts and we will get in touch with you as soon as possible!
      </h4>
      <span className={classes.career_form__info}>
        You can fill in one field (or several) if you wish.
      </span>
      <div className={classes.career_form__input_wrapper}>
        <div className={formClasses.form__input_block}>
          <BaseInput
            value={data ? data.user?.name! : name}
            type='text'
            placeholder='Name'
            onChange={handleNameChange}
            style={clsx(formClasses.form_input, classes.career_form__input)}
          />
          <BaseInput
            value={data ? data.user?.email! : email}
            type='email'
            placeholder='E-mail'
            onChange={handleEmailChange}
            style={clsx(formClasses.form_input, classes.career_form__input)}
          />
          <BaseInput
            value={phone}
            type='tel'
            placeholder='Phone number'
            onChange={handlePhoneChange}
            style={clsx(formClasses.form_input, classes.career_form__input)}
          />
        </div>
        <CustomButton title='Submit' size='large' onClick={handleSendMessage} type='filled' />
      </div>
    </div>
  );
};
