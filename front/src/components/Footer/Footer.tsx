import classes from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import { IMG_DOMAIN_SERVER } from "@/app/constants-server";
import { email, phone } from "@/types/contacts";
import { OpenModal } from "../Buttons/OpenModal";
import { IMenuInclude } from "@/types/menu";
import { MenuLink } from "../Navbar";
import { ContactLink } from "../Contacts";

export const Footer = ({ menuLinks, contactUs }: IMenuInclude) => {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.footer__wrapper}>
          <div className={classes.footer__logo}>
            {
              <Link href={"/"}>
                <Image
                  src={`${IMG_DOMAIN_SERVER}/logo_for_dark_bg.svg`}
                  alt="Simple2b logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            }
          </div>
          <div className={classes.footer__menu}>
            {menuLinks.map((itm) => (
              <MenuLink
                key={itm.id}
                itm={itm}
                style={classes.footer__menu_link}
              />
            ))}
          </div>
          <div className={classes.footer__links}>
            <ContactLink link={email.link} text={email.text} />
            <ContactLink link={phone.link} text={phone.text} />
            <div className={classes.footer__button}>
              <OpenModal btnText={contactUs} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
