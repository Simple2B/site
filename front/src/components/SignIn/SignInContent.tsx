import classes from "./SignInContent.module.scss";
import clsx from "clsx";
import SingBtn from "./SingBtn";

export const SignInContent = () => {
  return (
    <div className={clsx(classes.signinContent__wrapper)}>
      <div className={classes.signinContent__text}>
        <p>Dear candidate!</p>
        <p>
          To apply for this vacancy we want you to pass the Quiz. It consists of
          multiple choice questions and will take approximately 15 min.
        </p>
        <p>Please log in with Github to continue.</p>
      </div>
      <div className={classes.signin_button_container}>
        <SingBtn />
      </div>
    </div>
  );
};
