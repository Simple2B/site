"use client";

import { useSession } from "next-auth/react";
import { CSSProperties, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import clsx from "clsx";
import classes from "./Contacts.module.scss";
import baseClasses from "../Input/BaseInput.module.scss";
import baseFileClasses from "../Input/BaseFileInput.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import { CustomButton } from "../Buttons/CustomButton";
import ReCAPTCHA from "react-google-recaptcha";
import { contactFormAction } from "@/app/actions";

import { BarLoader } from "react-spinners";
import { useAppContext } from "@/context/state";
import { GoogleAds } from "../GoogleAds/GoogleAds";
import { SubmitStatus } from "@/types/gallery";
import { ContactFormSchema, TypeContactFormSchema } from "@/schema/contactForm";
import { FILE_SIZE_LIMIT } from "@/types/contacts";



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

export const spinnerStyle: CSSProperties = {
  display: "block",
  margin: "0 auto",
  backgroundColor: "#70bbff",
};

export interface Props {
  greyBg?: boolean;
  formType: "modal" | "page";
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
  const { data: userData } = useSession();
  const { modalActive, closeModal } = useAppContext();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("disable");

  const [isLoading, setIsLoading] = useState(false);

  const [isFileLarge, setIsFileLarge] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TypeContactFormSchema, string>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit: SubmitHandler<TypeContactFormSchema> = async (data) => {
    const isFileList = data.attachment && data.attachment instanceof FileList;

    if (isFileList && data.attachment[0] && data.attachment[0].size > FILE_SIZE_LIMIT) {
      setIsFileLarge(true);
      return
    }

    setIsFileLarge(false);
    setIsLoading(true);

    const inputData = {
      candidate_uuid: userData?.user.user_uuid,
      name: data.name,
      email: data.email,
      phone: data.phone.toString(),
      message: data.message,
    };
    const isBot = !!data.surname;

    const formFileData = new FormData();
    if (isFileList) {
      formFileData.append("file", data.attachment[0]);
    }
    setSubmitStatus("disable");

    try {
      const response = await contactFormAction(inputData, formFileData, isBot);
      setSubmitStatus(response.status);
      reset()
    } catch {
      alert(textForm.errorSendMessage);
      setSubmitStatus("fail");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (submitStatus === "success") {
      timer = setTimeout(() => {
        console.log("success");
        setSubmitStatus("normal");
        if (formType === "modal" && modalActive) {
          closeModal();
        }
      }, 3000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [submitStatus]);

  useEffect(() => {
    if (userData) {
      setValue('email', userData.user?.email!);
      setValue('name', userData.user?.name!);
    }
  }, [userData, setValue]);

  const inputStyle = [classes.form_input, greyBg && classes.form_input_grey];

  const captchaValidation = (value: string | null) => {
    if (value) {
      setSubmitStatus("normal");
    } else {
      setSubmitStatus("disable");
    }
  };
  const isDefault = ["normal", "disable"].includes(submitStatus);
  const buttonText = isDefault
    ? textForm.submit
    : submitStatus === "success"
      ? textForm.submitSuccess
      : textForm.submitError;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2 w-full">
        <div className="mb-10 w-full text-center">
          <div className={inputWrapperStyle}>
            <input
              {...register("name")}
              type="text"
              maxLength={126}
              min={1}
              className={clsx(baseClasses.base, ...inputStyle)}
              placeholder={textForm.name}
            />

            {errors.name && (
              <span className={classes.form__input_error}>
                {textForm.errorRequired}
              </span>
            )}
          </div>
          <div className={inputWrapperStyle}>
            <input
              type="text"
              {...register("surname")}
              className={clsx(
                baseClasses.base,
                ...inputStyle,
                classes.surname_class
              )}
              placeholder="Surname"
              maxLength={126}
            />
          </div>

          <div className={inputWrapperStyle}>
            <input
              {...register("email")}
              type="email"
              maxLength={126}
              min={1}
              className={clsx(baseClasses.base, ...inputStyle)}
              placeholder={textForm.email}
            />

            {errors.email && (
              <span className={classes.form__input_error}>
                {textForm.errorRequired}
              </span>
            )}
          </div>

          <div className={inputWrapperStyle}>
            <input
              type="number"
              {...register("phone", { valueAsNumber: true })}
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
              {...register("message")}
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
              {...register("attachment")}
              type="file"
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
              color={"#fde68a"}
              loading={isLoading}
              cssOverride={spinnerStyle}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>

          {submitStatus === "fail" && (
            <div>
              <span className="text-red-600 text-sm">{textForm.errorSend}</span>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
