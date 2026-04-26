import clsx from 'clsx';
import classes from './Contacts.module.scss';
import { getDictionaryByLang } from '@/i18n/dictionaries';
import { ContactLink } from './ContactLink';
import { email, phone } from '@/types/contacts';
import { SocialLinks } from './SocialLinks';

export interface IContactsProps {
  background?: boolean;
  lang: string;
}

export const Contacts: React.FC<IContactsProps> = async ({ background, lang }) => {
  const { content } = await getDictionaryByLang(lang);
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
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
