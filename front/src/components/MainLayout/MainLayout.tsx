import { Navbar } from "../Navbar/Navbar";
import { Modal } from "../Modal/Modal";
import { ModalContacts } from "../Contacts";
import { Footer } from "../Footer/Footer";
import classes from "./MainLayout.module.scss";
import { BurgerMenu } from "../BurgerMenu";
import { getTranslateDictionary } from "@/i18n/dictionaries";

export interface IMainLayoutProps {
  children: JSX.Element | JSX.Element[];
  hideFooter?: boolean;
}

export const MainLayout = async ({ children, hideFooter }: IMainLayoutProps) => {
  const content = await getTranslateDictionary();

  const menu = content.menuLinks;
  const contactUs = content.buttons.contactUs;
  const loginQut = content.buttons.loginQut;

  return (
    <>
      <div className={classes.isPhone}>
        <BurgerMenu menuLinks={menu} contactUs={contactUs} />
      </div>
      <div className={classes.isNotPhone}>
        <Navbar menuLinks={menu} contactUs={contactUs} loginQut={loginQut} />
      </div>
      <main className="content">{children}</main>
      {!hideFooter && <Footer menuLinks={menu} contactUs={contactUs} />}
      <Modal>
        <ModalContacts />
      </Modal>
    </>
  );
};
