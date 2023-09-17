"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

import classes from "./Career.module.scss";

import setAnswerAction from "@/app/actions-set-answer";
import { Question } from "@/openapi";

import { QuizQuestion } from "./QuizQuestion";
import { CustomButton } from "../Buttons/CustomButton";


const TOTAL_QUESTIONS = 25;

interface Props {
  question: Question;
}
export const QuizContainer = ({ question }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user_uuid = session.data?.user.user_uuid;
    const answer_id = (e.target as HTMLFormElement).question.value;

    if (!answer_id || isNaN(Number(answer_id)) || !user_uuid) {
      setShake(true);
      setTimeout(() => setShake(false), 1000);

      return;
    }

    await setAnswerAction(user_uuid, answer_id);

    if (question.current_progress === TOTAL_QUESTIONS - 1) {
      return router.push("/careers/contacts");
    }

    return router.refresh();
  };

  const buttonText = question.current_progress < TOTAL_QUESTIONS - 1 ? "Continue" : "Finish";
  const progress = (100 / TOTAL_QUESTIONS * (question.current_progress)).toFixed(2);

  return (
    <div className={classes.quiz__container}>
      <div className={classes.quiz__top}></div>
      <form className={classes.quiz__bottom} onSubmit={(e) => handleSubmit(e)}>
        {question && <QuizQuestion question={question} />}

        <CustomButton
          buttonType="submit"
          type="filled"
          title={buttonText}
          size="large"
          emptyAnswer={shake}
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
