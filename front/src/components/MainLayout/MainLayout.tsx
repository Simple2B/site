import { Navbar } from "../Navbar/Navbar";
import { Modal } from "../Modal/Modal";
import { ModalContacts } from "../Contacts";
import { Footer } from "../Footer/Footer";
import { BurgerMenu } from "../BurgerMenu";
import classes from "./MainLayout.module.scss";

export interface IMainLayoutProps {
  children: JSX.Element | JSX.Element[];
}
export const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <div className={classes.isPhone}>
        <BurgerMenu />
      </div>
      <div className={classes.isNotPhone}>
        <Navbar />
      </div>
      <main className="content">{children}</main>
      <Footer />
      <Modal>
        <ModalContacts />
      </Modal>
    </>
  );
};
