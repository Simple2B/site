import clsx from "clsx";
import React from "react";
import { CustomButton } from "../Buttons/CustomButton";
import classes from "./CommonSection.module.scss";
import { useMediaQuery } from 'react-responsive'

export interface ICommonSectionProps {
  title: string;
  buttonType: "outlined" | "filled";
  contentOrder: "column" | "row";
  background: boolean;
}
export const CommonSection: React.FC<ICommonSectionProps> = ({
  title,
  buttonType,
  contentOrder,
  children,
  background,
}) => {
  return (
    <section
      className={clsx(classes.section, background && classes.section_bg)}
    >
      <div className="container">
        <div className={classes.section__wrapper}>
          <h2 className={classes.section__header}>{title}</h2>
          <div
            className={clsx(
              classes.section__content,
              classes[`section__content_${contentOrder}`],
              contentOrder === "row" && classes.section__content_margin
            )}
          >
            {children}
          </div>
          <div className={classes.section__footer}>
            <CustomButton
              title="Learn more"
              size="large"
              onClick={() => {}}
              type={buttonType}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
