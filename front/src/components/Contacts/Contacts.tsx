import clsx from "clsx";
import classes from "./Contacts.module.scss";
import { getTranslateDictionary } from "@/i18n/dictionaries";
import { SocialLinks } from "./SocialLinks";
import { ContactForm } from "./ContactForm";
import { ContactLink } from "./ContactLink";
import { address, email, phone } from "@/types/contacts";

const BottomAddress = () => {
  return (
    <address className={classes.contacts__address}>
      <div className={classes.address__city}>
        <strong>{address.city}</strong>
      </div>
      <p className={classes.address__street}>{address.street}</p>
      {/* <SocialLinks /> */}
    </address>
  );
};

export interface IContactsProps {
  background?: boolean;
}
export const Contacts: React.FC<IContactsProps> = async ({ background }) => {
  const dict = await getTranslateDictionary();

  const content = dict.contacts;

  return (
    <section
      className={clsx(classes.contacts, background && classes.contacts_grey)}
    >
      <div className="container">
        <div className={classes.contacts__wrapper}>
          <h2 id="contacts" className={classes.contacts__header}>
            {content.title}
          </h2>
          <div className={classes.contacts__content}>
            <div className={classes.contacts__address_wrapper}>
              <address className={classes.contacts__address}>
                <div className={classes.address__main}>
                  {content.text + " "}
                  {<ContactLink link={email.link} text={email.text} bold />}
                  {" " + content.textTwo + " "}
                  {<ContactLink link={phone.link} text={phone.text} bold />}
                </div>
              </address>
              <div className={classes.isNotTablet}>
                <BottomAddress />
              </div>
            </div>
            <div className={classes.contacts__form}>
              <ContactForm greyBg={background} />
            </div>
            <div className={classes.isTablet}>
              <BottomAddress />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
