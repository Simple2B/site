import Image from "next/image";
import React, { useMemo } from "react";
import { WHAT_WE_DO } from "../../types/services";
import classes from "./WhatWeDo.module.scss";

export interface IWhatWeDoProps {}
export const WhatWeDo: React.FC<IWhatWeDoProps> = () => {
  const items = useMemo(
    () =>
      WHAT_WE_DO.map((item, idx) => {
        return (
          <li key={idx} className={classes.item}>
            <span className={classes.item__icon}>
              <Image
                alt="List item icon"
                src={"/svg/list_item_pin_24.svg"}
                width="24px"
                height="24px"
              />
            </span>
            <span className={classes.item__text}>{item}</span>
          </li>
        );
      }),
    []
  );

  return <ul className={classes.list}>{items}</ul>;
};
