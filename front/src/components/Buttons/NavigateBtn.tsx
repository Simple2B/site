import clsx from "clsx";
import Link from "next/link";

import classes from "./CustomButton.module.scss";

export interface INavigateBtn {
  pushTo: string;
  title: string;
  type?: "filled" | "outlined" | "none" | "outlinedWithBackground";
  size?: "small" | "large" | "smallForHeader";
  extraClasses?: string;
  status?: "success" | "fail" | "normal" | "disable";
  isNoHover?: boolean;
}

const NavigateBtn = async ({
  extraClasses,
  type = "filled",
  size = "small",
  status = "normal",
  isNoHover = false,
  pushTo,
  title,
}: INavigateBtn) => {
  return (
    <Link
      className={clsx(
        classes.button,
        classes[`button_${size}`],
        classes[`button_${type}`],
        classes[`button_${status}`],
        extraClasses,
        isNoHover && classes.button_noHover
      )}
      href={`${pushTo}`}
    >
      {title}
    </Link>
  );
};

export default NavigateBtn;
