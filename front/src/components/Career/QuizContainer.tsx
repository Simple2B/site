import classes from "./Career.module.scss";

import { QuizQuestion } from "./QuizQuestion";
import { CandidateService, OpenAPI, Question, QuestionOut } from "@/openapi";
import { getServerSession } from "next-auth";
import { options } from "@/app/options";
import { redirect } from "next/navigation";
import { CustomButton } from "../Buttons/CustomButton";

const TOTAL_QUESTIONS = 15;

interface Props {
  question: Question;
}
export const QuizContainer = async ({ question }: Props) => {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/singin");
  }

  const handleSubmit = async (data: FormData) => {
    "use server";

    const user_uuid = session.user.user_uuid;
    const answer_id = data.get("question");

    if (!answer_id || isNaN(Number(answer_id)) || !user_uuid) return;

    await CandidateService.setAnswer({
      user_uuid: user_uuid,
      answer_id: Number(answer_id),
    });

    redirect("/careers/quiz");
    // setAnswer(Number(answer_id), token as string);
  };

  const buttonText = question.current_progress <= TOTAL_QUESTIONS ? "Continue" : "Finish";
  const progress = (100 / TOTAL_QUESTIONS * (question.current_progress)).toFixed(2);

  return (
    <div className={classes.quiz__container}>
      <div className={classes.quiz__top}></div>
      <form className={classes.quiz__bottom} action={handleSubmit}>
        {question && <QuizQuestion question={question} />}

        <CustomButton
          buttonType="submit"
          type="filled"
          title={buttonText}
          size="large"
          extraClasses={classes.quiz__button}
        />

        <div className={classes.quiz__progress_container}>
          <h4 className={classes.quiz__progress_title}>Progress</h4>

          <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
            <div className="bg-teal-400 h-1 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </form>
    </div>
  );
};
