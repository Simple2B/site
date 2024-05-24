'use client';

import { useSession } from 'next-auth/react';
import { CSSProperties, useEffect, useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import clsx from 'clsx';
import classes from './Contacts.module.scss';
import baseClasses from '../Input/BaseInput.module.scss';
import baseFileClasses from '../Input/BaseFileInput.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '../Buttons/CustomButton';
import ReCAPTCHA from 'react-google-recaptcha';
import addCV from '@/app/actions';


import { BarLoader } from 'react-spinners';
import { useAppContext } from '@/context/state';
import { GoogleAds } from '../GoogleAds/GoogleAds';
import { SubmitStatus } from '@/types/gallery';

export const FILE_SIZE_LIMIT = 2 * 1024 * 1024;

const DEFAULT_FORM_VALUES = {
  name: '',
  email: '',
  phone: '',
  message: '',
  attachment: null,
};
const inputWrapperStyle = classes.form__input_wrapper;
const inputErrorStyle = classes.form__input_error;

export type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
  surname?: string;
  attachment: File | FileList | null;
};


const ContactFormSchema = z.object({
  name: z.string().min(1).max(126),
  email: z.string().email().min(1).max(126),
  phone: z.number().min(1).refine((val) => {
    return val.toString().length < 14
  }),
  message: z.string().max(1024),
  surname: z.string().max(126),
  attachment: z.any(),
});
type TypeContactFormSchema = z.infer<typeof ContactFormSchema>;


export const spinnerStyle: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  backgroundColor: '#70bbff',
};

export interface Props {
  greyBg?: boolean;
  formType: 'modal' | 'page';
  captchaKey: string;
  isGermany: boolean;
  textForm: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    submitSuccess: string;
    submitError: string;
    errorRequired: string;
    errorFile: string;
    errorSend: string;
    errorSendMessage: string;
  };
}

export const ContactForm = ({
  greyBg,
  formType,
  textForm,
  captchaKey,
  isGermany,
}: Props) => {
  const { data } = useSession();
  const { modalActive, closeModal } = useAppContext();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('disable');

  const [isLoading, setIsLoading] = useState(false);

  const [isFileLarge, setIsFileLarge] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeContactFormSchema, string>({ resolver: zodResolver(ContactFormSchema) });

  console.log(errors, "<---- errors")
  const onSubmit: SubmitHandler<TypeContactFormSchema> = async (data) => {
    console.log(data, "<---- input data");
    // const { name, email, message, phone, surname, attachment } = inputsData;
    // const isFileList = attachment && attachment instanceof FileList;

    // if (isFileList && attachment[0] && attachment[0].size > FILE_SIZE_LIMIT) {
    //   return setIsFileLarge(true);
    // }

    // setIsFileLarge(false);
    // setIsLoading(true);

    // const formData = new FormData();
    // isFileList && formData.append('file', attachment[0]);
    // formData.append('name', name);
    // formData.append('email', email);
    // formData.append('phone', phone);
    // formData.append('message', message);


    // // this input is hidden only bot can enter data
    // const isBot = !!surname;

    // try {
    //   const userType = data?.user.user_uuid ? 'candidate' : 'client';

    //   const response = await addCV(data?.user.user_uuid!, formData, userType, isBot);
    //   // setSubmitStatus(response.status as SubmitStatus);
    //   setIsLoading(false);
    // } catch {
    //   setIsLoading(false);
    //   alert(textForm.errorSendMessage);
    // }

  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (submitStatus === 'success') {
      timer = setTimeout(() => {
        console.log('success');
        setSubmitStatus('normal');
        if (formType === 'modal' && modalActive) {
          closeModal();
        }
      }, 3000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [submitStatus]);

  // useEffect(() => {
  //   if (data) {
  //     // setValue('email', data.user?.email!);
  //     // setValue('name', data.user?.name!);
  //   }
  // }, [data, setValue]);

  const inputStyle = [classes.form_input, greyBg && classes.form_input_grey];

  const captchaValidation = (value: string | null) => {
    if (value) {
      setSubmitStatus('normal');
    } else {
      setSubmitStatus('disable');
    }
  };
  const isDefault = ['normal', 'disable'].includes(submitStatus);
  const buttonText = isDefault
    ? textForm.submit
    : submitStatus === 'success'
      ? textForm.submitSuccess
      : textForm.submitError;


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2 w-full">
        <div className="mb-10 w-full text-center">
          <div className={inputWrapperStyle}>
            <input
              {...register("name")}
              type='text'
              maxLength={126}
              min={1}
              className={clsx(baseClasses.base, ...inputStyle)}
              placeholder={textForm.name}
            />

            {errors.name && (
              <span className={classes.form__input_error}>{textForm.errorRequired}</span>
            )}
          </div>
          <div className={inputWrapperStyle}>
            <input
              type="text"
              {...register('surname')}
              className={clsx(baseClasses.base, ...inputStyle, classes.surname_class)}
              placeholder='Surname'
              maxLength={126}
            />
          </div>

          <div className={inputWrapperStyle}>
            <input
              {...register("email")}
              type='email'
              maxLength={126}
              min={1}
              className={clsx(baseClasses.base, ...inputStyle)}
              placeholder={textForm.email}
            />

            {errors.email && (
              <span className={classes.form__input_error}>{textForm.errorRequired}</span>
            )}
          </div>

          <div className={inputWrapperStyle}>
            <input
              type="number"
              {...register('phone', { valueAsNumber: true })}
              className={clsx(baseClasses.base, ...inputStyle)}
              placeholder={textForm.phone}
              maxLength={16}
            />
            {errors.phone && (
              <span className={classes.form__input_error}>
                {textForm.errorRequired}
              </span>
            )}
          </div>

          <div className={inputWrapperStyle}>
            <textarea
              {...register('message')}
              placeholder={textForm.message}
              maxLength={1024}
              className={clsx(baseClasses.base, ...inputStyle)}
            />

            {errors.message && (
              <span className={inputErrorStyle}>{textForm.errorRequired}</span>
            )}
          </div>

          <div className={inputWrapperStyle}>
            <input
              {...register('attachment')}
              type="file"
              id={`${formType}-file-upload`}
              placeholder="Attachment"
              className={clsx(baseFileClasses.base, ...inputStyle)}
            />

            {isFileLarge && (
              <div className="text-red-600 w-80">{textForm.errorFile}</div>
            )}
          </div>

          <div
            className={clsx(
              classes.contacts__wrapper,
              classes.contacts__wrapper_captcha
            )}
          >
            <ReCAPTCHA
              sitekey={captchaKey}
              onChange={captchaValidation}
              type="image"
            />
          </div>

          <CustomButton
            title={buttonText}
            size="large"
            onClick={() => { }}
            type="filled"
            status={submitStatus}
          />

          <div className="mt-2">
            <BarLoader
              color={'#fde68a'}
              loading={isLoading}
              cssOverride={spinnerStyle}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>

          {submitStatus === 'fail' && (
            <div>
              <span className="text-red-600 text-sm">{textForm.errorSend}</span>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
