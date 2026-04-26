import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import classes from './MainLayout.module.scss';
import { BurgerMenu } from '../BurgerMenu';
import { getDictionaryByLang } from '@/i18n/dictionaries';

import BackToTop from './BackToTop';

export interface IMainLayoutProps {
  children: JSX.Element | JSX.Element[];
  hideFooter?: boolean;
  lang: string;
}

export const MainLayout = async ({
  children,
  hideFooter,
  lang,
}: IMainLayoutProps) => {
  const { content } = await getDictionaryByLang(lang);

  const menu = content.menuLinks.filter((itm) => itm.url !== '/careers');
  const contactUs = content.buttons.contactUs;

  return (
    <>
      <div className={classes.isPhone}>
        <BurgerMenu
          menuLinks={menu}
          contactUs={contactUs}
          isShowTranslationToggle
        />
      </div>

      <div className={classes.isNotPhone}>
        <Navbar
          menuLinks={menu}
          contactUs={contactUs}
          isShowTranslationToggle
          lang={lang}
        />
      </div>

      <main className="content">{children}</main>

      <BackToTop />

      {!hideFooter && <Footer menuLinks={menu} contactUs={contactUs} lang={lang} />}
    </>
  );
};
