import clsx from "clsx";
import React from "react";
import classes from "./BaseFileInput.module.scss";

export interface IBaseFileInputProps {
  files: File[] | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: string;
  required?: boolean;
}
export const BaseFileInput: React.FC<IBaseFileInputProps> = ({
  style,
  ...props
}) => {
  return (
    <>
      <input
        type="file"
        id="file-upload"
        {...props}
        className={clsx(classes.base, style)}
      />
    </>
  );
};
