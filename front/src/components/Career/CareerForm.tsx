"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

import clsx from "clsx";
import classes2 from "../Contacts/Contacts.module.scss";
import baseFileClasses from "../Input/BaseFileInput.module.scss";

import { VacancyElement } from '../../types/vacancies';
import { ControllerFormInput } from '../Contacts/ControllerFormInput';
import { CustomButton } from '../Buttons/CustomButton';
import { FILE_SIZE_LIMIT, Inputs, spinnerStyle } from '../Contacts/ContactForm';
import addCV from '@/app/actions';
import { BarLoader } from 'react-spinners';

export interface ICareerFormProps {
  vacancy: VacancyElement;
  userId: number;
}

const DEFAULT_FORM_VALUES = {
  name: "",
  email: "",
  phone: "",
  attachment: null,
}

export type SubminStatus = 'success' | 'fail' | 'normal' | 'disable';

export const CareerForm = () => {
  const { data } = useSession();

  const [submitStatus, setSubmitStatus] = useState<SubminStatus>("normal");
  const [isLoading, setIsLoading] = useState(false);
  const [isFileLarge, setIsFileLarge] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Inputs, string>({ defaultValues: DEFAULT_FORM_VALUES });

  const handleSendMessage: SubmitHandler<Inputs> = async (inputsData) => {
    const { name, email, phone, attachment, message } = inputsData;

    const isFileList = attachment && attachment instanceof FileList;

    if (isFileList && attachment[0].size > FILE_SIZE_LIMIT) {
      return setIsFileLarge(true);
    }

    setIsFileLarge(false);
    setIsLoading(true);

    if (isFileList) {
      const formData = new FormData();
      formData.append("file", attachment[0]);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("message", message);
      formData.append("user_type", "Candidate");

      try {
        const response = await addCV(data?.user.user_uuid!, formData);
        setSubmitStatus(response.status);
        setIsLoading(false);

        response.status === "success" && (
          setTimeout(() => setSubmitStatus("normal"), 3000)
        )
      } catch {
        setIsLoading(false);
        alert('Error while sending message');
      }
    }
  };

  useEffect(() => {
    if (data) {
      setValue("email", data.user?.email!);
      setValue("name", data.user?.name!);
    }
  }, [data, setValue]);

  const isDefault = submitStatus === "normal";
  const buttonText = isDefault ? "Submit" : submitStatus === "success" ? "Success" : "Fail";

  return (
    <>
      <form onSubmit={handleSubmit(handleSendMessage)} className="flex flex-col items-center">
        <h3 className="font-semibold text-3xl mb-5 tablet-max:text-center">
          Thank you for completing the Quiz!
        </h3>
        <h4 className="font-normal text-base mb-5 tablet-max:text-center">
          Please leave your contacts and we will get in touch with you as soon as possible!
        </h4>

        <div className="flex flex-col items-center w-[342px]">
          <div className="mb-10 w-full text-center">
            <ControllerFormInput
              name="name"
              placeholder="Name*"
              control={control}
              data={data ? data.user?.name! : null}
              error={errors.name}
            />

            <ControllerFormInput
              name="email"
              placeholder="Email*"
              type="email"
              control={control}
              data={data ? data.user?.email! : null}
              error={errors.email}
            />

            <ControllerFormInput
              name="phone"
              placeholder="Phone*"
              type="number"
              control={control}
              error={errors.phone}
            />

            <div className="mb-2 w-full">
              <input
                {...register("message")}
                placeholder="Message"
                className='text-base mb-2 outline-none w-full border-b-[1px] border-[#c4c4c4] border-solid pb-5'
              />
            </div>

            <div className="mb-2 w-full">
              <input
                {...register("attachment", { required: true })}
                type="file"
                id="file-upload"
                placeholder="Attachment"
                title="Please provide your CV."
                className={clsx(baseFileClasses.base, classes2.form_input)}
              />

              {errors.attachment && <span className="text-[#ff0000] text-sm">This field is required</span>}
              {isFileLarge && (
                <div
                  className="text-[#ff0000] w-80">
                  The file is too big! Allowed size: up to {FILE_SIZE_LIMIT} bytes ({FILE_SIZE_LIMIT / 1048576} mb)
                </div>
              )}
            </div>
          </div>

          <CustomButton
            title={buttonText}
            size='large'
            type='filled'
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

          {submitStatus === "fail" && (
            <div>
              <span className="text-[#ff0000] text-sm">The letter was not sent.</span>
            </div>
          )}
        </div>
      </form>

      <div className="mt-6">
        <Link href={"/"}>
          <Image
            src="https://simple2b-site-static.s3.eu-north-1.amazonaws.com/main-site-logo.svg"
            alt="Simple2b logo"
            width={78}
            height={78}
          />
        </Link>
      </div>
    </>
  );
};
