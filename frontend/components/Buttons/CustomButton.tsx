import clsx from "clsx";
import React from "react";
import classes from "./CustomButton.module.scss";

export interface ICustomButtonProps {
  title?: string;
  type?: "filled" | "outlined";
  size?: "small" | "large";
  extraClasses?: string;
  onClick: () => void;
}
export const CustomButton: React.FC<ICustomButtonProps> = ({
  extraClasses,
  type = "outlined",
  size = "small",
  title = "Awesome Button",
  onClick,
}) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button
      className={clsx(
        classes.button,
        classes[`button_${size}`],
        classes[`button_${type}`],
        extraClasses
      )}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
