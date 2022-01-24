import clsx from "clsx";
import React, { useEffect, useState, useMemo } from "react";
import classes from "./Navbar.module.scss";
import { menuList } from "../../types/menu";
import { CustomButton } from "../Buttons/CustomButton";
import { MenuLink } from "./MenuLink";
import LogoBlack from "../../assets/svg/logo/logo_blck.svg";
import { useMediaQuery } from "react-responsive";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";

export interface INavbarProps {}
export const Navbar: React.FC<INavbarProps> = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isPhone = useMediaQuery({
    query: "(max-width: 744px)",
  });
  const menuItems = menuList.map((itm) => <MenuLink key={itm.id} itm={itm} />);
  console.log("isPhone :>> ", isPhone);

  const mobileMenu = useMemo(() => <BurgerMenu />, [isMobile]);
  useEffect(() => {
    if (isPhone) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [isPhone]);

  if (isMobile) {
    return <>{mobileMenu}</>;
  }

  return (
    <nav className={clsx(classes.navbar)}>
      <div className="container">
        <div className={classes.navbar__wrapper}>
          <span className={classes.navbar__logo}>{<LogoBlack />}</span>
          <div className={classes.navbar__controls}>
            <div className={classes.navbar__list}>{menuItems}</div>
            {/* TODO: add navbar button click handler */}
            <CustomButton title="Contact Us" onClick={() => {}} />
          </div>
        </div>
      </div>
    </nav>
  );
};
