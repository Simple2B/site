import { User } from "@prisma/client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { prepareServerlessUrl } from "next/dist/server/base-server";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/state";
import { quizApi } from "../../services/quizApi";
import { CustomButton } from "../Buttons/CustomButton";
import { BaseInput } from "../Input/BaseInput";
import classes from "./Contacts.module.scss";

export interface IContactFormProps {
  greyBg?: boolean;
}
export const ContactForm: React.FC<IContactFormProps> = ({ greyBg }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [success, setSuccess] = useState<boolean | null>(null);

  const { data } = useSession();
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => {
      return { ...prev, name: false };
    });
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (email === "")
      setErrors((prev) => {
        return { ...prev, email: false };
      });
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value.slice(-1)) !== 0) {
      if (!parseInt(e.target.value.slice(-1)) && e.target.value.length > 0)
        return;
    }
    setPhone(e.target.value);
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
    if (name === "") {
      setErrors((prev) => {
        return { ...prev, name: true };
      });
      trigger = true;
    }
    if (email === "") {
      setErrors((prev) => {
        return { ...prev, email: true };
      });
      trigger = true;
    }
    if (message === "") {
      setErrors((prev) => {
        return { ...prev, message: true };
      });
      trigger = true;
    }
    if (trigger) {
      console.log("errors :>> ", errors);
      return;
    }
    const newMessage = await quizApi.addMessage(name, email, message, phone);
    if (newMessage) {
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
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

  const buttonText = success === null ? "Send" : success ? "Success" : "Fail";
  const buttonStyle =
    success === null ? "normal" : success ? "success" : "fail";
  return (
    <>
      <div className={classes.form__input_block}>
        <div className={classes.form__input_wrapper}>
          <BaseInput
            value={data ? data.user?.name! : name}
            placeholder="Name  *"
            onChange={handleNameChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
            required
          />
          {errors.name && (
            <span className={classes.form__input_error}>
              This field is required
            </span>
          )}
        </div>
        <div className={classes.form__input_wrapper}>
          <BaseInput
            value={data ? data.user?.email! : email}
            type="email"
            placeholder="E-mail  *"
            onChange={handleEmailChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
          />
          {errors.email && (
            <span className={classes.form__input_error}>
              This field is required
            </span>
          )}
        </div>
        <div className={classes.form__input_wrapper}>
          <BaseInput
            value={phone}
            type="tel"
            placeholder="Phone number"
            onChange={handlePhoneChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
          />
        </div>
        <div className={classes.form__input_wrapper}>
          <BaseInput
            value={message}
            placeholder="Message  *"
            onChange={handleMessageChange}
            style={clsx(classes.form_input, greyBg && classes.form_input_grey)}
          />
          {errors.message && (
            <span className={classes.form__input_error}>
              This field is required
            </span>
          )}
        </div>
      </div>
      <CustomButton
        title={buttonText}
        size="large"
        onClick={handleSendMessage}
        type="filled"
        status={buttonStyle}
      />
    </>
  );
};
