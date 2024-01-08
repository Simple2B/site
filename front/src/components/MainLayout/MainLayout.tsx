import { headers } from 'next/headers';

import { Navbar } from '../Navbar/Navbar';
import { Modal } from '../Modal/Modal';
import { ModalContacts } from '../Contacts';
import { Footer } from '../Footer/Footer';
import classes from './MainLayout.module.scss';
import { BurgerMenu } from '../BurgerMenu';
import { getTranslateDictionary } from '@/i18n/dictionaries';

import BackToTop from './BackToTop';

export interface IMainLayoutProps {
  children: JSX.Element | JSX.Element[];
  hideFooter?: boolean;
}

export const MainLayout = async ({
  children,
  hideFooter,
}: IMainLayoutProps) => {
  const { content } = await getTranslateDictionary();

  const host = headers().get('host');
  const isGermany = host?.includes('.de') ? true : false;

  const menu = content.menuLinks.filter((itm) =>
    isGermany && itm.url === '/careers' ? false : true
  );

  const contactUs = content.buttons.contactUs;

  return (
    <>
      <div className={classes.isPhone}>
        <BurgerMenu
          menuLinks={menu}
          contactUs={contactUs}
          isShowTranslationToggle={isGermany}
        />
      </div>

      <div className={classes.isNotPhone}>
        <Navbar
          menuLinks={menu}
          contactUs={contactUs}
          isShowTranslationToggle={isGermany}
        />
      </div>

      <main className="content">{children}</main>

      <BackToTop />

      {!hideFooter && <Footer menuLinks={menu} contactUs={contactUs} />}

      <Modal>
        <ModalContacts />
      </Modal>
    </>
  );
};
