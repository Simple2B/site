import React, { useMemo } from "react";
import { OUR_MISSION } from "../../types/services";
import Image from "next/image";
import classes from "./CustomList.module.scss";

export interface ICustomListProps {
  list: string[];
  icon?: "done" | "pin";
}
export const CustomList: React.FC<ICustomListProps> = ({
  list,
  icon = "done",
}) => {
  const items = useMemo(
    () =>
      list.map((item, idx) => {
        return (
          <li key={idx} className={classes.item}>
            <span className={classes.item__icon}>
              <Image
                alt="List item icon"
                src={`/svg/list_item_${icon}_24.svg`}
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
