import classes from "./ModalContacts.module.scss";
import { ContactForm } from "./ContactForm";
import { ContactLink } from "./ContactLink";
import Image from "next/image";
import { email, phone } from "@/types/contacts";

const image = (
  <Image
    src="https://simple2b-site-static.s3.eu-north-1.amazonaws.com/magnet.svg"
    alt={`Contact us. Bee with magnet :-)`}
    width="320"
    height="218"
    quality={60}
  />
)

export const ModalContacts = () => {
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

          <div className="desktop:hidden mb-[116px]">
            {image}
          </div>
        </div>

        <div className={classes.contacts__form}>
          <ContactForm formType="modal" />
        </div>

        <div className="desktop-min:hidden mb-[116px]">
          {image}
        </div>
      </div>
    </div>
  );
};
