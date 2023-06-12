"use client";

import React, { useState } from "react";
import clsx from "clsx";

import classes from "./Accordion.module.scss";
import Image from "next/image";
import { ITechnologyItem } from "../../types/technologies";

export interface IAccordionItemProps {
  item: ITechnologyItem;
}
export const AccordionItem: React.FC<IAccordionItemProps> = ({ item }) => {
  const [isActive, setIsActive] = useState(false);
  const handleItemClick = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <div className={classes.accordion__wrapper} onClick={handleItemClick}>
      <div className={clsx(classes.accordion__button)}>
        <span className={classes.accordion__icon}>
          <Image
            alt="List item icon"
            src={`/svg/technologies/${item.icon}.svg`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </span>
        <span className={classes.accordion__text}>{item.title}</span>
        <span className={classes.accordion__status_icon}>
          <Image
            alt="List item icon"
            src={`/svg/${!isActive ? "deactivate" : "activate"}.svg`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </span>
      </div>
      <div
        className={clsx(
          classes.accordion__panel,
          isActive && classes.accordion__panel_active
        )}
      >
        {item.description}
      </div>
    </div>
  );
};
