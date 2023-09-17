"use client";

import { useState } from "react";

import clsx from "clsx";
import classes from "./Accordion.module.scss";
import Image from "next/image";
import { ITechnologyItem } from "@/types/technologies";
import { IMG_DOMAIN } from "@/app/constants";

const IMAGE_STYLE = { width: "100%", height: "auto" };
export interface IAccordionItemProps {
  item: ITechnologyItem;
}

export const AccordionItem = ({ item }: IAccordionItemProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleItemClick = () => {
    setIsActive((prev) => !prev);
  };

  const {
    accordion__wrapper,
    accordion__button,
    accordion__icon,
    accordion__text,
    accordion__status_icon,
    accordion__panel,
    accordion__panel_active
  } = classes;

  return (
    <div className={accordion__wrapper} onClick={handleItemClick}>
      <div className={clsx(accordion__button)}>
        <span className={accordion__icon}>
          <Image
            alt="List item icon"
            src={`${IMG_DOMAIN}/services/technologies/${item.icon}.svg`}
            width={0}
            height={0}
            sizes="100vw"
            style={IMAGE_STYLE}
          />
        </span>

        <span className={accordion__text}>{item.title}</span>

        <span className={accordion__status_icon}>
          <Image
            alt="List item icon"
            src={`/svg/${!isActive ? "deactivate" : "activate"}.svg`}
            width={0}
            height={0}
            sizes="100vw"
            style={IMAGE_STYLE}
          />
        </span>
      </div>

      <div
        className={clsx(
          accordion__panel,
          isActive && accordion__panel_active
        )}
      >
        {item.description}
      </div>
    </div>
  );
};
