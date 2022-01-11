import clsx from "clsx";
import React from "react";
import { CustomButton } from "../Buttons/CustomButton";
import classes from "./Contacts.module.scss";
import { address, email, phone, telegram } from "../../types/contacts";
import { SocialLinks } from "./SocialLinks";
import { ContactForm } from "./ContactForm";

const emailLink = (
  <a href={`mailto:${email}`}>
    <strong>{email}</strong>
  </a>
);
const TELEGRAM = (
  <a href={telegram.link}>
    <strong>{telegram.text}</strong>
  </a>
);
const PHONE = (
  <a href={phone.link}>
    <strong>{phone.text}</strong>
  </a>
);

export interface IContactsProps {}
export const Contacts: React.FC<IContactsProps> = () => {
  return (
    <section className={clsx(classes.contacts)}>
      <div className="container">
        <div className={classes.contacts__wrapper}>
          <h2 className={classes.contacts__header}>Contact Us</h2>
          <div className={classes.contacts__content}>
            <address className={classes.contacts__address}>
              <p className={classes.address__main}>
                If you want to contact us you can write an e-mail on {emailLink}{" "}
                or call on number {PHONE}. Or you can also contact us via
                Telegram {TELEGRAM}.
              </p>
              <p className={classes.address__city}>
                <strong>{address.city}</strong>
              </p>
              <p className={classes.address__street}>{address.street}</p>
              <SocialLinks />
            </address>
            <div className={classes.contacts__form}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
