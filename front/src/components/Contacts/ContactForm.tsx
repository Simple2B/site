'use client'

import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/state';
import { quizApi } from '../../services/quizApi';
import { CustomButton } from '../Buttons/CustomButton';
import { BaseInput } from '../Input/BaseInput';
import { BaseFileInput } from '../Input/BaseFileInput';
import classes from './Contacts.module.scss';

export interface IContactFormProps {
  greyBg?: boolean;
}
export const ContactForm: React.FC<IContactFormProps> = ({ greyBg }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorTest, setErrorText] = useState<string>('');

  const { data } = useSession();
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => {
      return { ...prev, name: false };
    });
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (email === '')
      setErrors((prev) => {
        return { ...prev, email: false };
      });
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value.slice(-1)) !== 0) {
      if (!parseInt(e.target.value.slice(-1)) && e.target.value.length > 0) return;
    }
    setPhone(e.target.value);
  };
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files![0];
      setAttachment(file);
    }
  };
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => {
      return { ...prev, message: false };
    });
    setMessage(e.target.value);
  };
  const handleSendMessage = async () => {
    let trigger = false;
    if (success !== null) return;
    if (name === '') {
      setErrors((prev) => {
        return { ...prev, name: true };
      });
      trigger = true;
    }
    if (email === '') {
      setErrors((prev) => {
        return { ...prev, email: true };
      });
      trigger = true;
    }
    if (message === '') {
      setErrors((prev) => {
        return { ...prev, message: true };
      });
      trigger = true;
    }
    if (trigger) {
      console.log('errors :>> ', errors);
      return;
    }

    const newMessage = await quizApi.addMessage(name, email, message, phone);

    const TARGET_HOST = 'https://mailer.simple2b.net';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);
    console.log('file', attachment);

    if (attachment) {
      formData.append('file', attachment, attachment.name);
    }

    const mailerResponse = await fetch(`${TARGET_HOST}/send_message`, {
      method: 'POST',
      body: formData,
    });

    if (mailerResponse.status !== 200) {
      const maillerResponseJson = await mailerResponse.json();
      if (maillerResponseJson.message) {
        setErrorText(maillerResponseJson.message);
        return;
      }
    }

    if (newMessage && mailerResponse.status === 200) {
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setAttachment(null);
    } else {
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (data) {
      setEmail(data.user?.email!);
      setName(data.user?.name!);
    }
  }, [data]);

  const buttonText = success === null ? 'Send' : success ? 'Success' : 'Fail';
  const buttonStyle = success === null ? 'normal' : success ? 'success' : 'fail';
  return (
    <>
      <div className={classes.form__input_block}>
        <div className={classes.form__input_wrapper}>
          <BaseInput
            value={data ? data.user?.name! : name}
            placeholder='Name  *'
            onChange={handleNameChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
            required
          />
          {errors.name && <span className={classes.form__input_error}>This field is required</span>}
        </div>
        <div className={classes.form__input_wrapper}>
          <BaseInput
            value={data ? data.user?.email! : email}
            type='email'
            placeholder='E-mail  *'
            onChange={handleEmailChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
          />
          {errors.email && (
            <span className={classes.form__input_error}>This field is required</span>
          )}
        </div>
        <div className={classes.form__input_wrapper}>
          <BaseInput
            value={phone}
            type='tel'
            placeholder='Phone number'
            onChange={handlePhoneChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
          />
        </div>
        <div className={classes.form__input_wrapper}>
          <BaseInput
            value={message}
            placeholder='Message  *'
            onChange={handleMessageChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
          />
          {errors.message && (
            <span className={classes.form__input_error}>This field is required</span>
          )}
        </div>
        <div className={classes.form__input_wrapper}>
          <BaseFileInput
            files={attachment && [attachment]}
            placeholder='Attachment'
            onChange={handleAttachmentChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
          />
        </div>
        <div className={classes.contacts__wrapper}>
          {errorTest && <span className={classes.form__input_error}>{errorTest}</span>}
        </div>
      </div>
      <CustomButton
        title={buttonText}
        size='large'
        onClick={handleSendMessage}
        type='filled'
        status={buttonStyle}
      />
    </>
  );
};
