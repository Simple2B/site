"use client";

import React from "react";
import { menuList } from "../../types/menu";
import { MenuLink } from "../Navbar/MenuLink";
import classes from "./Footer.module.scss";
import { email, phone, telegram } from "../../types/contacts";
import { ContactLink } from "../Contacts/ContactLink";
import { CustomButton } from "../Buttons/CustomButton";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";

export interface IFooterProps {
  openModal: () => void;
}
export const Footer: React.FC<IFooterProps> = ({ openModal }) => {
  const isTablet = useMediaQuery({
    query: "(max-width: 1240px)",
  });
  const isPhone = useMediaQuery({
    query: "(max-width: 744px)",
  });

  const menuItems = menuList.map((itm) => (
    <MenuLink key={itm.id} itm={itm} style={classes.footer__menu_link} />
  ));

  if (isPhone) {
    return (
      <footer className={classes.footer}>
        <div className="container">
          <div className={classes.footer__wrapper}>
            <ContactLink link={email.link} text={email.text} />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.footer__wrapper}>
          <div className={classes.footer__logo}>
            {
              <Link href={"/"}>
                <Image
                  src={`/svg/logo/logo_wh.svg`}
                  alt="Simple2b logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            }
          </div>
          <div className={classes.footer__menu}>{menuItems}</div>
          <div className={classes.footer__links}>
            <ContactLink link={email.link} text={email.text} />
            <ContactLink link={phone.link} text={phone.text} />
            {isTablet ? (
              <div className={classes.footer__button}>
                <CustomButton
                  onClick={openModal}
                  title="Contact Us"
                  type="filled"
                />
              </div>
            ) : (
              <div className={classes.footer__button}>
                <CustomButton
                  onClick={openModal}
                  title="Contact Us"
                  type="filled"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
