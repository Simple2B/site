import Link from "next/link";
import Image from "next/image";
import classes from "@/components/Navbar/Navbar.module.scss";

import { QuizContainer } from "@/components/Career/QuizContainer";
import { CommonSection } from "@/components";
import { QuestionService } from "@/openapi";
import { redirect } from "next/navigation";

export interface IApplyContactsProps {
  user_uuid: string;
}

const QuizStart = async ({ user_uuid }: IApplyContactsProps) => {
  let res;
  try {
    res = await QuestionService.getRandomQuestion(user_uuid);
  } catch (error) {
    console.log(`Can't get random question`, error);
    redirect("/singin");
  }
  // useExitPrompt();

  // const hangleConfirm: MouseEventHandler<HTMLAnchorElement> = (e) => {
  //   if (confirm("Are you sure you want to exit?")) {
  //   } else {
  //     e.preventDefault();
  //     return;
  //   }
  // };

  return (
    <>
      <div className={classes.navbar__logo_container}>
        <Link href={"/"}>
          <Image
            src={`/svg/logo/logo_blck.svg`}
            alt="Simple2b logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
      </div>

      <CommonSection
        contentOrder="column"
        title="Career Quiz"
        buttonType="none"
        isCaseSection
        fullWidth
        background
        dense
      >
        {res.question ? (
          <QuizContainer question={res.question} />
        ) : (
          <div>Sorry you already answer on all questions</div>
        )}
      </CommonSection>
    </>
  );
};

export default QuizStart;
