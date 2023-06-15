import clsx from "clsx";
import React from "react";
import classes from "./ModalContacts.module.scss";
import { ContactForm } from "./ContactForm";
import { ContactLink } from "./ContactLink";
import Image from "next/image";
import { email, phone } from "@/types/contacts";

export interface IModalContactsProps {}
export const ModalContacts: React.FC<IModalContactsProps> = () => {
  return (
    <div className={classes.contacts__wrapper}>
      <h2 id="contacts" className={classes.contacts__header}>
        Contact Us
      </h2>
      <div className={classes.contacts__content}>
        <div className={classes.contacts__address_wrapper}>
          <address className={classes.contacts__address}>
            If you want to contact us you can write an e-mail on{" "}
            {<ContactLink link={email.link} text={email.text} bold />} or call
            on number {<ContactLink link={phone.link} text={phone.text} bold />}
            . <br />
          </address>
          <div
            className={clsx(
              classes.contacts__image,
              classes.contacts__image_side
            )}
          >
            <Image
              src={`/svg/bees/magnet.svg`}
              alt={`Contact us. Bee with magnet :-)`}
              width="100"
              height="100"
              quality={60}
            />
          </div>
        </div>
        <div className={classes.contacts__form}>
          <ContactForm />
        </div>
        <div
          className={clsx(
            classes.contacts__image,
            classes.contacts__image_bottom
          )}
        >
          <Image
            src={`/svg/bees/magnet.svg`}
            alt={`Contact us. Bee with magnet :-)`}
            width="100"
            height="100"
            quality={60}
          />
        </div>
      </div>
    </div>
  );
};
