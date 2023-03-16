import React, { useEffect, useState } from "react";
import { BaseInput } from "../Input/BaseInput";
import classes from "./Career.module.scss";
import formClasses from "../Contacts/Contacts.module.scss";
import { CustomButton } from "../Buttons/CustomButton";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  OpenAPI,
  SetUserAttempt,
  UserAnswer,
  UsersService,
} from "../../pages/api/backend";

export interface ICareerFormProps {
  vacancy: any;
  userId: any;
  answers: UserAnswer[];
}
export const CareerForm: React.FC<ICareerFormProps> = ({
  vacancy,
  userId,
  answers,
}) => {
  const { data, status } = useSession();
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelegram(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value.slice(-1)) !== 0) {
      if (!parseInt(e.target.value.slice(-1)) && e.target.value.length > 0)
        return;
    }
    setPhone(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSendMessage = async () => {
    // let user: User;
    // if (vacancy.isDeveloper || data?.user) {
    //   user = await quizApi.updateUser(userId, phone, telegram, email);
    // } else {
    //   user = await quizApi.addUser(name, email, phone, telegram);
    // }
    // await quizApi.addRespond(user.id, vacancy.id);

    OpenAPI.TOKEN = data?.user.access_token;
    const contact_data = {
      name: !name ? null : name,
      email: !email ? null : name,
      telegram: !telegram ? null : telegram,
      phone: !phone ? null : phone,
    };
    const resData = { answers, contact_data };

    console.log(resData, "resData");

    try {
      const setAnswer = await UsersService.setUserAttemptUserSetAttemptPost(
        resData as SetUserAttempt
      );
    } catch (error) {
      console.error(error);
    }

    router.push("/careers");
  };

  useEffect(() => {
    if (data?.user) {
      setEmail(data.user.email!);
      setName(data.user.name!);
    }
  }, []);

  if (status === "loading") {
    return <div className="loader_container"></div>;
  }
  return (
    <div className={classes.career_form}>
      <h3 className={classes.career_form__title}>
        Thank you for completing the Quiz!
      </h3>
      <h4 className={classes.career_form__sub_title}>
        Please leave your contacts and we will get in touch with you as soon as
        possible!
      </h4>
      <span className={classes.career_form__info}>
        You can fill in one field (or several) if you wish.
      </span>
      <div className={classes.career_form__input_wrapper}>
        <div className={formClasses.form__input_block}>
          <BaseInput
            value={name}
            type="text"
            placeholder="Name"
            onChange={handleNameChange}
            style={clsx(formClasses.form_input, classes.career_form__input)}
          />
          <BaseInput
            value={email}
            type="email"
            placeholder="E-mail"
            onChange={handleEmailChange}
            style={clsx(formClasses.form_input, classes.career_form__input)}
          />
          <BaseInput
            value={phone}
            type="tel"
            placeholder="Phone number"
            onChange={handlePhoneChange}
            style={clsx(formClasses.form_input, classes.career_form__input)}
          />
          <BaseInput
            value={telegram}
            placeholder="Telegram"
            onChange={handleTelegramChange}
            style={clsx(formClasses.form_input, classes.career_form__input)}
          />
        </div>
        <CustomButton
          title="Submit"
          size="large"
          onClick={handleSendMessage}
          type="filled"
        />
      </div>
    </div>
  );
};
