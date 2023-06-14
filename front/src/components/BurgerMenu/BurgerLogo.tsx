"use client";

import Link from "next/link";
import Image from "next/image";
import classes from "./BurgerMenu.module.scss";

export const BurgerLogo = () => {
  return (
    <div className={classes.burger__logo}>
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
    </div>
  )
}
