"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import clsx from "clsx";
import classes from "./Contacts.module.scss";
import baseClasses from "../Input/BaseInput.module.scss";
import baseFileClasses from "../Input/BaseFileInput.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import { quizApi } from "../../services/quizApi";
import { CustomButton } from "../Buttons/CustomButton";
import { ControllerFormInput } from "./ControllerFormInput";

const TARGET_HOST = "https://mailer.simple2b.net";
const DEFAULT_FORM_VALUES = {
  name: "",
  email: "",
  phone: "",
  message: "",
  attachment: null,
}
const inputWrapperStyle = classes.form__input_wrapper;
const inputErrorStyle = classes.form__input_error;

export interface IContactFormProps {
  greyBg?: boolean;
}

export type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
  attachment: File | null;
}

export const ContactForm: React.FC<IContactFormProps> = ({ greyBg }) => {
  const { data } = useSession();

  const [sendEmailError, setSendEmailError] = useState<string>('');
  const [success, setSuccess] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<Inputs>({ defaultValues: DEFAULT_FORM_VALUES });

  const onSubmit: SubmitHandler<Inputs> = async (inputsData) => {
    const { name, email, message, phone, attachment } = inputsData;

    console.log('input data to API: ', inputsData)
    const newMessage = await quizApi.addMessage(name, email, message, phone);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    console.log("file", attachment);

    if (attachment) {
      formData.append("file", attachment, attachment.name);
    }

    const mailerResponse = await fetch(`${TARGET_HOST}/send_message`, {
      method: "POST",
      body: formData,
    });

    if (mailerResponse.status !== 200) {
      const maillerResponseJson = await mailerResponse.json();
      if (maillerResponseJson.message) {
        setSendEmailError(maillerResponseJson.message);
        return;
      }
    }

    if (newMessage && mailerResponse.status === 200) {
      setSuccess(true);
      reset();

      return;
    } else {
      return setSuccess(false);
    }
  }

  useEffect(() => {
    if (data) {
      setValue("email", data.user?.email!);
      setValue("name", data.user?.name!);
    }
  }, [data, setValue]);

  const inputStyle = [classes.form_input, greyBg && classes.form_input_grey];

  const isNoSuccess = success === null;
  const buttonText = isNoSuccess ? "Send" : success ? "Success" : "Fail";
  const buttonStyle = isNoSuccess ? "normal" : success ? "success" : "fail";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.form__input_block}>
        <ControllerFormInput
          name="name"
          placeholder="Name*"
          control={control}
          data={data ? data.user?.name! : null}
          error={errors.name}
          backgroundStyle={greyBg}
        />

        <ControllerFormInput
          name="email"
          placeholder="Email*"
          type="email"
          control={control}
          data={data ? data.user?.email! : null}
          error={errors.email}
          backgroundStyle={greyBg}
        />

        <ControllerFormInput
          name="phone"
          placeholder="Phone*"
          type="number"
          control={control}
          error={errors.phone}
          backgroundStyle={greyBg}
        />

        <div className={inputWrapperStyle}>
          <input
            {...register("message", { required: true })}
            placeholder="Message*"
            className={clsx(baseClasses.base, ...inputStyle)}
          />

          {errors.message && <span className={inputErrorStyle}>This field is required</span>}
        </div>

        <div className={inputWrapperStyle}>
          <input
            {...register("attachment")}
            type="file"
            id="file-upload"
            placeholder="Attachment"
            className={clsx(baseFileClasses.base, ...inputStyle)}
          />
        </div>

        <div className={classes.contacts__wrapper}>
          {sendEmailError && (
            <span className={inputErrorStyle}>{sendEmailError}</span>
          )}
        </div>

        <CustomButton
          title={buttonText}
          size="large"
          onClick={() => { }}
          type="filled"
          status={buttonStyle}
        />
      </div>
    </form>
  );
};
