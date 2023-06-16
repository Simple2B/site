import clsx from "clsx";
import React from "react";
import classes from "./CommonSection.module.scss";
import { RedirectBtn } from "./RedirectBtn";

export interface ICommonSectionProps {
  title: string;
  buttonType: "outlined" | "filled" | "none" | "outlinedWithBackground";
  contentOrder: "column" | "row" | "row_wrap";
  subtitle?: string;
  background?: boolean;
  buttonText?: string;
  isCaseSection?: boolean;
  isAboutSection?: boolean;
  isSignInSection?: boolean;
  redirectTo?: string;
  fullWidth?: boolean;
  dense?: boolean;
  children: JSX.Element | JSX.Element[];
}
export const CommonSection: React.FC<ICommonSectionProps> = ({
  title,
  buttonType,
  contentOrder,
  children,
  background,
  buttonText = "Learn more",
  isCaseSection,
  isAboutSection,
  isSignInSection,
  subtitle,
  redirectTo,
  fullWidth,
  dense,
}) => {
  return (
    <section
      className={clsx(
        classes.section,
        background && classes.section_bg,
        isCaseSection && classes.section_case,
        dense && classes.section_dense
      )}
    >
      <div className="container">
        <div className={classes.section__wrapper}>
          <h2
            className={clsx(
              classes.section__header,
              subtitle && classes.section__header_subtitle,
              isSignInSection && classes.section__header_signIn
            )}
          >
            {title}
          </h2>
          <h3 className={classes.section__subtitle}>{subtitle}</h3>
          <div
            className={clsx(
              classes.section__content,
              isAboutSection && classes.section_about,
              classes[`section__content_${contentOrder}`],
              contentOrder === "row" && classes.section__content_margin,
              fullWidth && classes.section__content_full
            )}
          >
            {children}
          </div>
          {redirectTo && buttonText && (
            <div className={classes.section__footer}>
              <RedirectBtn
                title={buttonText}
                type={buttonType}
                redirectTo={redirectTo}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
