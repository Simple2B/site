import clsx from "clsx";
import classes from "./ModalContacts.module.scss";
import { ContactForm } from "./ContactForm";
import { ContactLink } from "./ContactLink";
import Image from "next/image";
import { email, phone } from "@/types/contacts";
import { CandidateInfoBlock } from "./CandidateInfoBlock";
import { getTranslateDictionary } from "@/i18n/dictionaries";

export interface IModalContactsProps {}
export const ModalContacts: React.FC<IModalContactsProps> = async () => {
  const dict = await getTranslateDictionary();

  const content = dict.contacts;

  return (
    <div className={classes.contacts__wrapper}>
      <h2 id="contacts" className={classes.contacts__header}>
        {content.title}
      </h2>
      <div className={classes.contacts__content}>
        <div className={classes.contacts__address_wrapper}>
          <address className={classes.contacts__address}>
            {content.text + " "}
            {<ContactLink link={email.link} text={email.text} bold />}
            {" " + content.textTwo + " "}
            {<ContactLink link={phone.link} text={phone.text} bold />}
            . <br />
          </address>

          <CandidateInfoBlock />

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
