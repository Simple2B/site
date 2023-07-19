import classes from "./ModalContacts.module.scss";
import { ContactForm } from "./ContactForm";
import { ContactLink } from "./ContactLink";
import Image from "next/image";
import { email, phone } from "@/types/contacts";
import { getTranslateDictionary } from "@/i18n/dictionaries";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";

const image = (
  <Image
    src={`${IMG_DOMAIN_SERVER}/others/magnet.svg`}
    alt={`Contact us. Bee with magnet :-)`}
    width="320"
    height="218"
    quality={60}
  />
)

export const ModalContacts = async () => {
  const dict = await getTranslateDictionary();
  const content = dict.contacts;

  return (
    <div className={classes.contacts__wrapper}>
      <h2 id="contacts" className={classes.contacts__header}>
        {content.title}1
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
