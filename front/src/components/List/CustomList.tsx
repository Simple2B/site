import clsx from "clsx";
import classes from "./CustomList.module.scss";
import Image from "next/image";

export interface ICustomListProps {
  list: { id: number; description: string }[];
  icon?: "done" | "pin";
  isAboutSection?: boolean;
}
export const CustomList = ({
  list,
  icon = "done",
  isAboutSection,
}: ICustomListProps) => {
  return (
    <ul className={clsx(classes.list, isAboutSection && classes.list_width)}>
      {list.map(({ id, description }) => (
        <li key={id} className={classes.item}>
          <span className={classes.item__icon}>
            <Image
              alt="List item icon"
              src={`/svg/list_item_${icon}_24.svg`}
              width="24"
              height="24"
              sizes="24vw"
            />
          </span>

          <span className={classes.item__text}>{description}</span>
        </li>
      ))}
    </ul>
  );
};
