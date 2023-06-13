"use client";

import clsx from "clsx";
import React, { useMemo } from "react";
import classes from "./Navbar.module.scss";
import { menuList } from "../../types/menu";
import { CustomButton } from "../Buttons/CustomButton";
import { MenuLink } from "./MenuLink";
import { useMediaQuery } from "react-responsive";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import Link from "next/link";
import Image from "next/image";

export interface INavbarProps {
  openModal: () => void;
}
export const Navbar: React.FC<INavbarProps> = ({ openModal }) => {
  const isPhone = useMediaQuery({
    query: "(max-width: 744px)",
  });
  const menuItems = menuList.map((itm) => <MenuLink key={itm.id} itm={itm} />);

  const mobileMenu = useMemo(() => <BurgerMenu />, [isPhone]);
  // useEffect(() => {
  //   if (isPhone) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // }, [isPhone]);

  // const { openModal } = useAppContext();

  if (isPhone) {
    return <>{mobileMenu}</>;
  }

  return (
    <nav className={clsx(classes.navbar)}>
      <div className="container">
        <div className={classes.navbar__wrapper}>
          <span className={classes.navbar__logo_container}>
            {
              <Link href={"/"}>
                <Image
                  src={`/svg/logo/logo_blck.svg`}
                  alt="Simple2b logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            }
          </span>
          <div className={classes.navbar__controls}>
            <div className={classes.navbar__list}>{menuItems}</div>
            {/* TODO: add navbar button click handler */}
            <CustomButton
              title="Contact Us"
              onClick={openModal}
              size="smallForHeader"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
