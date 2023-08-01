"use client";

import clsx from "clsx";
import classes from "./Case.module.scss";

export interface ICaseChipProps {
  title: string;
  isActive?: boolean;
  onClick: (stackName: string) => void;
}

export const CaseChip: React.FC<ICaseChipProps> = ({
  title,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <div
      className={clsx(classes.chip, isActive && classes.chip_active)}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};
