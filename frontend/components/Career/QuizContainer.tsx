import React, { useEffect, useState } from "react";
import classes from "./Career.module.scss";

import { CustomButton } from "../Buttons/CustomButton";
import { QuizQuestion } from "./QuizQuestion";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  OpenAPI,
  QuestionOut,
  QuestionsService,
  UserAnswer,
  VariantQuestion,
} from "../../pages/api/backend";

const getProgress = (total: number, current: number) => (current / total) * 100;

export interface IQuizContainerProps {
  vacancySlug: string;
  questions: number[];
  callBackAddAnswer: (answer: UserAnswer) => void;
}
export const QuizContainer: React.FC<IQuizContainerProps> = ({
  vacancySlug,
  questions,
  callBackAddAnswer,
}) => {
  const router = useRouter();
  const session = useSession();

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questionsArr, setQuestionsArr] = useState<number[]>(questions);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionOut | null>(
    null
  );
  const [answerVariant, setAnswerVariant] = useState<VariantQuestion | null>(
    null
  );

  const count = questionsArr.length;
  const selectAnswer = (variant: VariantQuestion) => {
    setAnswerVariant(variant);
  };
  const getQuestion = async (step: number) => {
    if (step > questionsArr.length) return;
    try {
      OpenAPI.TOKEN = session.data?.user.access_token;
      const question =
        await QuestionsService.getQuestionByIdApiQuestionsQuestionIdGet(
          questionsArr[step]
        );
      setCurrentQuestion(question);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    setProgress(getProgress(count, step));
    getQuestion(step);
  }, [step]);

  const handleSubmitAnswer = async () => {
    if (answerVariant === null || !currentQuestion) {
      return;
    }
    const answer: UserAnswer = {
      answer_id: answerVariant.id,
    };

    callBackAddAnswer(answer);
    setAnswerVariant(null);
    if (step === questionsArr.length - 1) {
      return;
    }
    setStep((prev) => prev + 1);
  };

  const buttonText = step < questionsArr.length - 1 ? "Continue" : "Finish";
  const buttonColor = answerVariant === null ? "outlined" : "filled";
  return (
    <div className={classes.quiz__container}>
      <div className={classes.quiz__top}>
        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            selectCallback={selectAnswer}
          />
        )}
      </div>
      <div className={classes.quiz__bottom}>
        <CustomButton
          onClick={handleSubmitAnswer}
          type={buttonColor}
          title={buttonText}
          size="large"
          extraClasses={classes.quiz__button}
        />
        <div className={classes.quiz__progress_container}>
          <h4 className={classes.quiz__progress_title}>Progress</h4>
          <progress
            id="file"
            max="100"
            value={progress}
            className={classes.quiz__progress_component}
          />
        </div>
      </div>
    </div>
  );
};
