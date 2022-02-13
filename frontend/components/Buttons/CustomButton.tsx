import clsx from "clsx";
import React from "react";
import classes from "./CustomButton.module.scss";

export interface ICustomButtonProps {
  onClick: () => void;
  title?: string;
  type?: "filled" | "outlined" | "none" | "outlinedWithBackground";
  size?: "small" | "large" | "smallForHeader";
  extraClasses?: string;
  status?:"success" | "fail" | "normal"
}
export const CustomButton: React.FC<ICustomButtonProps> = ({
  extraClasses,
  type = "outlined",
  size = "small",
  title = "Awesome Button",
  status = "normal",
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
        classes[`button_${status}`],
        extraClasses
      )}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
