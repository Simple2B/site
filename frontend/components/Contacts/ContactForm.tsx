import clsx from "clsx";
import React, { useState } from "react";
import { CustomButton } from "../Buttons/CustomButton";
import { BaseInput } from "../Input/BaseInput";
import classes from "./Contacts.module.scss";

export interface IContactFormProps {}
export const ContactForm: React.FC<IContactFormProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {};
  return (
    <>
      <div className={classes.form__input_block}>
        <BaseInput
          value={name}
          placeholder="Name"
          onChange={handleNameChange}
          style={clsx(classes.form_input)}
        />
        <BaseInput
          value={email}
          type="email"
          placeholder="E-mail"
          onChange={handleEmailChange}
          style={clsx(classes.form_input)}
        />
        <BaseInput
          value={phone}
          type="tel"
          placeholder="Phone number"
          onChange={handlePhoneChange}
          style={clsx(classes.form_input)}
        />
        <BaseInput
          value={message}
          placeholder="Message"
          onChange={handleMessageChange}
          style={clsx(classes.form_input)}
        />
      </div>
      <CustomButton
        title="Send"
        size="large"
        onClick={handleSendMessage}
        type="filled"
      />
    </>
  );
};
