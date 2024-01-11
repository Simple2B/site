import clsx from 'clsx';
import classes from './Contacts.module.scss';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { SocialLinks } from './SocialLinks';
import { ContactForm } from './ContactForm';
import { ContactLink } from './ContactLink';
import { address, email, phone } from '@/types/contacts';

const CAPTCHA_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY;

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
export const Contacts: React.FC<IContactsProps> = async ({ background }) => {
  const { content } = await getTranslateDictionary();
  const contacts = content.contacts;

  return (
    <section
      className={clsx(classes.contacts, background && classes.contacts_grey)}
    >
      <div className="container">
        <div className={classes.contacts__wrapper}>
          <h2 id="contacts" className={classes.contacts__header}>
            {contacts.title}
          </h2>
          <div className={classes.contacts__content}>
            <div className={classes.contacts__address_wrapper}>
              <address className={classes.contacts__address}>
                <div className={classes.address__main}>
                  {contacts.text + ' '}
                  {<ContactLink link={email.link} text={email.text} bold />}
                  {' ' + contacts.textTwo + ' '}
                  {<ContactLink link={phone.link} text={phone.text} bold />}
                </div>
              </address>
              <div className={classes.isNotTablet}>
                <BottomAddress />
              </div>
            </div>
            <div className={classes.contacts__form}>
              <ContactForm
                formType="page"
                greyBg={background}
                textForm={contacts.form}
                captchaKey={CAPTCHA_KEY || ''}
              />
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
