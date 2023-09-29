'use client';

import { useSession } from 'next-auth/react';
import { CSSProperties, useEffect, useState } from 'react';

import clsx from 'clsx';
import classes from './Contacts.module.scss';
import baseClasses from '../Input/BaseInput.module.scss';
import baseFileClasses from '../Input/BaseFileInput.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '../Buttons/CustomButton';
import { ControllerFormInput } from './ControllerFormInput';
import ReCAPTCHA from 'react-google-recaptcha';
import addCV from '@/app/actions';
import { SubmitStatus } from '../Career/CareerForm';
import { BarLoader } from 'react-spinners';
import { useAppContext } from '@/context/state';
import { useMediaQuery } from 'react-responsive';

const CAPTCHA_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY || '';
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
  attachment: File | FileList | null;
};

export const spinnerStyle: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  backgroundColor: '#70bbff',
};

export interface Props {
  greyBg?: boolean;
  formType: 'modal' | 'page';
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

export const ContactForm = ({ greyBg, formType, textForm }: Props) => {
  const { data } = useSession();
  const { modalActive, closeModal } = useAppContext();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('disable');

  const [isLoading, setIsLoading] = useState(false);

  const [isFileLarge, setIsFileLarge] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    control,
  } = useForm<Inputs, string>({ defaultValues: DEFAULT_FORM_VALUES });

  const onSubmit: SubmitHandler<Inputs> = async (inputsData) => {
    const { name, email, message, phone, attachment } = inputsData;
    const isFileList = attachment && attachment instanceof FileList;

    if (isFileList && attachment[0] && attachment[0].size > FILE_SIZE_LIMIT) {
      return setIsFileLarge(true);
    }

    setIsFileLarge(false);
    setIsLoading(true);

    const formData = new FormData();
    isFileList && formData.append('file', attachment[0]);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);

    try {
      const userType = data?.user.user_uuid ? 'candidate' : 'client';

      const response = await addCV(data?.user.user_uuid!, formData, userType);
      setSubmitStatus(response.status as SubmitStatus);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      alert(textForm.errorSendMessage);
    }
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

  useEffect(() => {
    if (data) {
      setValue('email', data.user?.email!);
      setValue('name', data.user?.name!);
    }
  }, [data, setValue]);

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

  const handleOnchangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (errors.phone) {
      clearErrors('phone');
    }

    if (isNaN(Number(value))) {
      setValue('phone', '');
      return;
    }

    setValue('phone', e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-2 w-full">
      <div className="mb-10 w-full text-center">
        <ControllerFormInput
          name="name"
          placeholder={textForm.name}
          control={control}
          data={data ? data.user?.name! : null}
          error={errors.name}
          backgroundStyle={greyBg}
          textRequired={textForm.errorRequired}
        />

        <ControllerFormInput
          name="email"
          placeholder={textForm.email}
          type="email"
          control={control}
          data={data ? data.user?.email! : null}
          error={errors.email}
          backgroundStyle={greyBg}
          textRequired={textForm.errorRequired}
        />

        <div className={inputWrapperStyle}>
          <input
            type="text"
            {...register('phone', { required: true, maxLength: 16 })}
            className={clsx(baseClasses.base, ...inputStyle)}
            placeholder={textForm.phone}
            onChange={handleOnchangePhoneNumber}
            maxLength={16}
          />
          {errors.phone && (
            <span className={classes.form__input_error}>
              {textForm.errorRequired}
            </span>
          )}
        </div>

        <div className={inputWrapperStyle}>
          <input
            {...register('message', { required: true, maxLength: 256 })}
            placeholder={textForm.message}
            maxLength={256}
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
            sitekey={CAPTCHA_KEY}
            onChange={captchaValidation}
            type="image"
          />
        </div>

        <CustomButton
          title={buttonText}
          size="large"
          onClick={() => {}}
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
  );
};
