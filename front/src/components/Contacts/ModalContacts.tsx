import classes from './ModalContacts.module.scss';
import { ContactForm } from './ContactForm';
import { ContactLink } from './ContactLink';
import Image from 'next/image';
import { email, phone } from '@/types/contacts';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { IMG_DOMAIN_SERVER } from '@/app/constants-server';
import { headers } from 'next/headers';
import { BottomAddress } from './BottomAddress';

const CAPTCHA_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY;

const image = (
  <Image
    src={`${IMG_DOMAIN_SERVER}/others/magnet.svg`}
    alt={`Contact us. Bee with magnet :-)`}
    width="320"
    height="218"
    quality={60}
  />
);

export const ModalContacts = async () => {
  const { content } = await getTranslateDictionary();

  const host = headers().get('host');
  const isGermany = !!host?.includes('.de');

  const modalContent = content.contacts;
  return (
    <div className={classes.contacts__wrapper}>
      <h2 id="contacts" className={classes.contacts__header}>
        {modalContent.title}
      </h2>
      <div className={classes.contacts__content}>
        <div className={classes.contacts__address_wrapper}>
          <address className={classes.contacts__address}>
            {modalContent.text + ' '}
            {<ContactLink link={email.link} text={email.text} bold />}
            {' ' + modalContent.textTwo + ' '}
            {<ContactLink link={phone.link} text={phone.text} bold />}
            . <br />
          </address>
          <BottomAddress isGermany={isGermany} />

          <div className="desktop:hidden mb-[116px]">{image}</div>
        </div>

        <div className={classes.contacts__form}>
          <ContactForm
            formType="modal"
            textForm={modalContent.form}
            captchaKey={CAPTCHA_KEY || ''}
            isGermany={isGermany}
          />
        </div>

        <div className="desktop-min:hidden mb-[116px]">{image}</div>
      </div>
    </div>
  );
};
