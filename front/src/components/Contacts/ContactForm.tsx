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
import ReCAPTCHA from "react-google-recaptcha";
import addCV from "@/app/actions";
import { SubminStatus } from "../Career/CareerForm";

const CAPTCHA_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY || "";
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
  attachment: File | FileList | null;
}

export const ContactForm: React.FC<IContactFormProps> = ({ greyBg }) => {
  const { data } = useSession();

  const [sendEmailError, setSendEmailError] = useState<string>('');
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<SubminStatus>("normal");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<Inputs, string>({ defaultValues: DEFAULT_FORM_VALUES });

  const onSubmit: SubmitHandler<Inputs> = async (inputsData) => {
    const { name, email, message, phone, attachment } = inputsData;

    const isFileList = attachment && attachment instanceof FileList;

    // if (isFileList) {
    const formData = new FormData();
    isFileList && formData.append("file", attachment[0]);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    formData.append("user_type", "Client or Candidate");

    const response = await addCV(data?.user.user_uuid!, formData);

    setSubmitStatus(response.status);
    // }

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("phone", phone);
    // formData.append("message", message);

    // if (attachment instanceof File) {
    //   formData.append("file", attachment, attachment.name);
    // }

    // const mailerResponse = await fetch(`${TARGET_HOST}/send_message`, {
    //   method: "POST",
    //   body: formData,
    // });

    // if (mailerResponse.status !== 200) {
    //   const maillerResponseJson = await mailerResponse.json();
    //   if (maillerResponseJson.message) {
    //     setSendEmailError(maillerResponseJson.message);
    //     return;
    //   }
    // }

    // if (mailerResponse.status === 200) {
    //   setSuccess(true);
    //   reset();

    //   return;
    // } else {
    //   return setSuccess(false);
    // }
  }

  useEffect(() => {
    if (data) {
      setValue("email", data.user?.email!);
      setValue("name", data.user?.name!);
    }
  }, [data, setValue]);

  const inputStyle = [classes.form_input, greyBg && classes.form_input_grey];

  const captchaValidation = (value: string | null) => {
    if (value) {
      setIsButtonDisable(false);
    } else {
      setIsButtonDisable(true);
    }
  }

  // const isDefault = success === null;
  // const buttonText = isDefault ? "Send" : success ? "Success" : "Fail";
  // const buttonStyle = isButtonDisable ? "disable" : isDefault ? "normal" : success ? "success" : "fail";
  const isDefault = submitStatus === "normal";
  const buttonText = isDefault ? "Submit" : submitStatus === "success" ? "Success" : "Fail";

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

        <div className={clsx(classes.contacts__wrapper, classes.contacts__wrapper_captcha)}>
          <ReCAPTCHA
            sitekey={CAPTCHA_KEY}
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
      </div>
    </form>
  );
};
