"use client";

import Link from "next/link";
import Image from "next/image";

import clsx from "clsx";
import classes from "./Navbar.module.scss";

import { MenuLink } from "./MenuLink";
import { CustomButton } from "../Buttons/CustomButton";
import { menuList } from "@/types/menu";

export interface INavbarProps {
  openModal: () => void;
}

export const Navbar = ({ openModal }: INavbarProps) => {
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
            <div className={classes.navbar__list}>
              {menuList.map((itm) => (
                <MenuLink key={itm.id} itm={itm} />
              )
              )}
            </div>
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
