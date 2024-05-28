'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

import clsx from 'clsx';
import classes from '../Contacts/Contacts.module.scss';
import baseClasses from '../Input/BaseInput.module.scss';
import baseFileClasses from '../Input/BaseFileInput.module.scss';

import { VacancyElement } from '../../types/vacancies';
import { ControllerFormInput } from '../Contacts/ControllerFormInput';
import { CustomButton } from '../Buttons/CustomButton';
import { spinnerStyle } from '../Contacts/ContactForm';
import { BarLoader } from 'react-spinners';
import { IMG_DOMAIN } from '@/app/constants';
import { useRouter } from 'next/navigation';
import { SubmitStatus } from '@/types/gallery';
import { TypeCareerFormSchema, careerFormSchema } from '@/schema/careerForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { FILE_SIZE_LIMIT } from '@/types/contacts';
import { careerFormAction } from '@/app/actions';

export interface ICareerFormProps {
  vacancy: VacancyElement;
  userId: number;
}


export const CareerForm = () => {
  const { data } = useSession();
  const router = useRouter();

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [isFileLarge, setIsFileLarge] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TypeCareerFormSchema, string>({
    resolver: zodResolver(careerFormSchema),
  });


  const handleSendMessage: SubmitHandler<TypeCareerFormSchema> = async (inputsData) => {
    const isFileList = inputsData.attachment && inputsData.attachment instanceof FileList;

    if (isFileList && inputsData.attachment.length === 0) {
      return;
    }

    if (isFileList && inputsData.attachment[0] && inputsData.attachment[0].size > FILE_SIZE_LIMIT) {
      setIsFileLarge(true);
      return
    }

    setIsFileLarge(false);
    setIsLoading(true);

    const resData = {
      candidate_uuid: data?.user.user_uuid,
      name: inputsData.name,
      email: inputsData.email,
      phone: inputsData.phone.toString(),
      message: inputsData.message,
    };

    const formFileData = new FormData();
    if (isFileList) {
      formFileData.append("file", inputsData.attachment[0]);
    }
    setSubmitStatus("disable");

    try {
      const response = await careerFormAction(resData, formFileData);
      setSubmitStatus(response.status);
      reset()
    } catch {
      alert('Error while sending message');
      setSubmitStatus("fail");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (submitStatus === 'fail') {
      timer = setTimeout(() => {
        setSubmitStatus('normal');
      }, 3000);
    }
    if (submitStatus === 'success') {
      timer = setTimeout(() => {
        setSubmitStatus('normal');
        router.push('/');
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

  const isDefault = ["disable", 'normal'].includes(submitStatus);
  const buttonText = isDefault
    ? 'Submit'
    : submitStatus === 'success'
      ? 'Success'
      : 'Fail';



  const inputStyle = [baseClasses.base, classes.form_input];

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex flex-col items-center"
      >
        <h3 className="font-semibold text-3xl mb-5 tablet-max:text-center">
          Thank you for completing the Quiz!
        </h3>
        <h4 className="font-normal text-base mb-5 tablet-max:text-center">
          Please leave your contacts and we will get in touch with you as soon
          as possible!
        </h4>

        <div className="flex flex-col items-center w-[342px]">
          <div className="mb-10 w-full text-center">
            <input
              {...register("name")}
              type="text"
              maxLength={126}
              min={1}
              className={clsx(baseClasses.base, ...inputStyle)}
              placeholder="Name*"
            />
            {errors.name && (
              <span className={classes.form__input_error}>
                {errors.name.message}
              </span>
            )}
            <input
              {...register("email")}
              type="email"
              maxLength={126}
              min={1}
              className={clsx(baseClasses.base, ...inputStyle)}
              placeholder="Email*"
            />
            {errors.email && (
              <span className={classes.form__input_error}>
                {errors.email.message}
              </span>
            )}
            <div className={classes.form__input_wrapper}>
              <input
                type="number"
                {...register('phone', { required: true, maxLength: 16, valueAsNumber: true })}
                className={clsx(...inputStyle)}
                placeholder='Phone*'
                maxLength={16}
              />
              {errors.phone && (
                <span className={classes.form__input_error}>
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="mb-2 w-full">
              <input
                type='text'
                {...register('message', { maxLength: 1048 })}
                placeholder="Message*"
                maxLength={1048}
                className="text-base mb-2 outline-none w-full border-b-[1px] border-[#c4c4c4] border-solid pb-5"
              />
              {errors.message && (
                <span className={classes.form__input_error}>
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="mb-2 w-full">
              <input
                {...register('attachment')}
                type="file"
                placeholder="Attachment"
                className={clsx(baseFileClasses.base, classes.form_input)}
                required
              />

              {errors.attachment && (
                <span className="text-[#ff0000] text-sm">
                  Invalid file
                </span>
              )}
              {isFileLarge && (
                <div className="text-[#ff0000] w-80">
                  The file is too big! Allowed size: up to {FILE_SIZE_LIMIT}{' '}
                  bytes ({FILE_SIZE_LIMIT / 1048576} mb)
                </div>
              )}
            </div>
          </div>

          <CustomButton
            title={buttonText}
            size="large"
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
              <span className="text-[#ff0000] text-sm">
                The letter was not sent.
              </span>
            </div>
          )}
        </div>
      </form>

      <div className="mt-6">
        <Link href={'/'}>
          <Image
            src={`${IMG_DOMAIN}/logos/main_site_logo.svg`}
            alt="Simple2B logo"
            width={78}
            height={78}
          />
        </Link>
      </div>
    </>
  );
};
