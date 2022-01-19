import React from "react";
import { menuList } from "../../types/menu";
import { MenuLink } from "../Navbar/MenuLink";
import classes from "./Footer.module.scss";
import { email, phone, telegram } from "../../types/contacts";
import { ContactLink } from "../Contacts/ContactLink";
import { CustomButton } from "../Buttons/CustomButton";
import LogoWhite from "../../assets/svg/logo/logo_wh.svg";
import { useMediaQuery } from "react-responsive";

export interface IFooterProps {}
export const Footer: React.FC<IFooterProps> = () => {
  const isTablet = useMediaQuery({
    query: "(max-width: 1240px)",
  });

  const menuItems = menuList.map((itm) => (
    <MenuLink key={itm.id} itm={itm} style={classes.footer__menu_link} />
  ));
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.footer__wrapper}>
          <div className={classes.footer__logo}>
            <LogoWhite />
          </div>
          <div className={classes.footer__menu}>{menuItems}</div>
          <div className={classes.footer__links}>
            <ContactLink link={email.link} text={email.text} />
            <ContactLink link={phone.link} text={phone.text} />
            <ContactLink link={telegram.link} text={telegram.text} />
            {isTablet && (
              <div className={classes.footer__button}>
                <CustomButton
                  onClick={() => {}}
                  title="Contact Us"
                  type="filled"
                />
              </div>
            )}
          </div>
          {!isTablet && (
            <div className={classes.footer__button}>
              <CustomButton
                onClick={() => {}}
                title="Contact Us"
                type="filled"
              />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
