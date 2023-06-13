"use client";

import clsx from "clsx";
import React from "react";
import classes from "./Contacts.module.scss";
import { address, email, phone, telegram } from "../../types/contacts";
import { SocialLinks } from "./SocialLinks";
import { ContactForm } from "./ContactForm";
import { ContactLink } from "./ContactLink";
import { useMediaQuery } from "react-responsive";

const BottomAddress = () => {
  return (
    <address className={classes.contacts__address}>
      <div className={classes.address__city}>
        <strong>{address.city}</strong>
      </div>
      <p className={classes.address__street}>{address.street}</p>
      <SocialLinks />
    </address>
  );
};

export interface IContactsProps {
  background?: boolean;
}
export const Contacts: React.FC<IContactsProps> = ({ background }) => {
  const isTablet = useMediaQuery({
    query: "(max-width: 1240px)",
  });

  console.log(isTablet, "isTablet");
  return (
    <section
      className={clsx(classes.contacts, background && classes.contacts_grey)}
    >
      <div className="container">
        <div className={classes.contacts__wrapper}>
          <h2 id="contacts" className={classes.contacts__header}>
            Contact Us
          </h2>
          <div className={classes.contacts__content}>
            <div className={classes.contacts__address_wrapper}>
              <address className={classes.contacts__address}>
                <div className={classes.address__main}>
                  If you want to contact us you can write an e-mail on{" "}
                  {<ContactLink link={email.link} text={email.text} bold />} or
                  call on number{" "}
                  {<ContactLink link={phone.link} text={phone.text} bold />}.{" "}
                  <br />
                </div>
              </address>
              {!isTablet && (
                <div>
                  <BottomAddress />
                </div>
              )}
            </div>
            <div className={classes.contacts__form}>
              <ContactForm greyBg={background} />
            </div>
            {isTablet && <BottomAddress />}
          </div>
        </div>
      </div>
    </section>
  );
};
