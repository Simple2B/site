import clsx from 'clsx';
import classes from './Contacts.module.scss';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { ContactForm } from './ContactForm';
import { ContactLink } from './ContactLink';
import { email, phone } from '@/types/contacts';
import { headers } from 'next/headers';
import { BottomAddress } from './BottomAddress';

const CAPTCHA_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY;

export interface IContactsProps {
  background?: boolean;
}
export const Contacts: React.FC<IContactsProps> = async ({ background }) => {
  const { content } = await getTranslateDictionary();
  const host = headers().get('host');
  const isGermany = !!host?.includes('.de');
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
                <BottomAddress isGermany={isGermany} />
              </div>
            </div>
            <div className={classes.contacts__form}>
              <ContactForm
                formType="page"
                greyBg={background}
                textForm={contacts.form}
                captchaKey={CAPTCHA_KEY || ''}
                isGermany={isGermany}
              />
            </div>
            <div className={classes.isTablet}>
              <BottomAddress isGermany={isGermany} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
