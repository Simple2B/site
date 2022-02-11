import clsx from "clsx";
import React from "react";
import { CustomButton } from "../Buttons/CustomButton";
import classes from "./CommonSection.module.scss";
import { useMediaQuery } from "react-responsive";

export interface ICommonSectionProps {
  title: string;
  buttonType: "outlined" | "filled" | "none";
  contentOrder: "column" | "row" | "row_wrap";
  subtitle?: string;
  background?: boolean;
  buttonText?: string;
  isCaseSection?: boolean;
  btnCallback?: () => void;
  fullWidth?: boolean;
  dense?: boolean;
}
export const CommonSection: React.FC<ICommonSectionProps> = ({
  title,
  buttonType,
  contentOrder,
  children,
  background,
  buttonText = "Learn more",
  isCaseSection,
  subtitle,
  btnCallback,
  fullWidth,
  dense
}) => {
  const handleButtonClick = () => {
    btnCallback && btnCallback();
  };

  return (
    <section
      className={clsx(
        classes.section,
        background && classes.section_bg,
        isCaseSection && classes.section_case,
        dense && classes.section_dense,
      )}
    >
      <div className="container">
        <div className={classes.section__wrapper}>
          <h2
            className={clsx(
              classes.section__header,
              subtitle && classes.section__header_subtitle
            )}
          >
            {title}
          </h2>
          <h3 className={classes.section__subtitle}>{subtitle}</h3>
          <div
            className={clsx(
              classes.section__content,
              classes[`section__content_${contentOrder}`],
              contentOrder === "row" && classes.section__content_margin,
              fullWidth && classes.section__content_full
            )}
          >
            {children}
          </div>
          <div className={classes.section__footer}>
            <CustomButton
              title={buttonText}
              size="large"
              onClick={handleButtonClick}
              type={buttonType}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
