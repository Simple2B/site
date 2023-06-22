"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import clsx from "clsx";
import classes2 from "../Contacts/Contacts.module.scss";
import baseFileClasses from "../Input/BaseFileInput.module.scss";

import { VacancyElement } from '../../types/vacancies';
import { ControllerFormInput } from '../Contacts/ControllerFormInput';
import { CustomButton } from '../Buttons/CustomButton';
import ReCAPTCHA from 'react-google-recaptcha';

const TARGET_HOST = "https://mailer.simple2b.net";
const CAPTCHA_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY || "";

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

export type Inputs = {
  name: string;
  email: string;
  phone: string;
  attachment: File | null;
}

export const CareerForm = () => {
  const { data } = useSession();
  const router = useRouter();

  const [sendEmailError, setSendEmailError] = useState<string>('');
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isButtonDisable, setIsButtonDisable] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Inputs, string>({ defaultValues: DEFAULT_FORM_VALUES });

  const handleSendMessage: SubmitHandler<Inputs> = async (inputsData) => {

    const { name, email, phone, attachment } = inputsData;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    console.log('attachment: ', attachment);


    if (attachment) {
      formData.append("file", attachment);
    }

    const mailerResponse = await fetch(`${TARGET_HOST}/send_message`, {
      method: "POST",
      body: formData,
    });

    console.log('mailerResponse: ', mailerResponse);


    if (mailerResponse.status !== 200) {
      const maillerResponseJson = await mailerResponse.json();
      if (maillerResponseJson.message) {
        setSendEmailError(maillerResponseJson.message);
        return;
      }
    }

    if (mailerResponse.status === 200) {
      setSuccess(true);
      router.push('/careers');

      return;
    } else {
      return setSuccess(false);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("email", data.user?.email!);
      setValue("name", data.user?.name!);
    }
  }, [data, setValue]);

  const captchaValidation = (value: string | null) => {
    if (value) {
      setIsButtonDisable(false);
    } else {
      setIsButtonDisable(true);
    }
  }

  const isDefault = success === null;
  const buttonText = isDefault ? "Submit" : success ? "Success" : "Fail";
  const buttonStyle = isButtonDisable ? "disable" : isDefault ? "normal" : success ? "success" : "fail";

  return (
    <form onSubmit={handleSubmit(handleSendMessage)} className="flex flex-col items-center">
      <h3 className="font-semibold text-3xl mb-5">
        Thank you for completing the Quiz!
      </h3>
      <h4 className="font-normal text-base mb-5">
        Please leave your contacts and we will get in touch with you as soon as possible!
      </h4>
      <span className="font-normal text-base mb-5">
        You can fill in one field (or several) if you wish.
      </span>

      <div className="flex flex-col items-center">
        <div className="mb-10 w-full">
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
              {...register("attachment", { required: true })}
              type="file"
              id="file-upload"
              placeholder="Attachment"
              className={clsx(baseFileClasses.base, classes2.form_input)}
            />

            {errors.attachment && <span className="text-red-600 text-sm">This field is required</span>}
          </div>
        </div>

        <div className="mb-4">
          <ReCAPTCHA
            sitekey={CAPTCHA_KEY}
            onChange={captchaValidation}
            type="image"
          />
        </div>

        <CustomButton
          title={buttonText}
          size='large'
          type='filled'
          status={buttonStyle}
        />

        <div>
          {sendEmailError && (
            <span className="text-red-600 text-sm">{sendEmailError}</span>
          )}
        </div>
      </div>
    </form>
  );
};
