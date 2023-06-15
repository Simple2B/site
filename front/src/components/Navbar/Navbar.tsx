import Link from "next/link";
import Image from "next/image";

import clsx from "clsx";
import classes from "./Navbar.module.scss";

import { MenuLink } from "./MenuLink";
import { menuList } from "@/types/menu";
import { OpenModal } from "../Buttons/OpenModal";

export const Navbar = () => {
  return (
    <nav className={clsx(classes.navbar)}>
      <div className="container">
        <div className={classes.navbar__wrapper}>
          <div className={classes.navbar__logo_container}>
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
          </div>

          <div className={classes.navbar__controls}>
            <div className={classes.navbar__list}>
              {menuList.map((itm) => (
                <MenuLink key={itm.id} itm={itm} />
              ))}
            </div>
            <OpenModal />
          </div>
        </div>
      </div>
    </nav>
  );
};
