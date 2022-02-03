import React, { useEffect, useState } from "react";
import classes from "./Career.module.scss";

import questions from "../../data/quiz.json";
import { CustomButton } from "../Buttons/CustomButton";
import { QuizQuestion } from "./QuizQuestion";
import { IQuizAnswer, IQuizQuestion } from "../../types/quiz";

const TOTAL_QUESTIONS = 25;
const getProgress = (total: number, current: number) => (current / total) * 100;

const provideTmpQuestions = () => {
  return questions.questions.map((itm, idx): IQuizQuestion => {
    const answers = itm.answers.map((itm, idx): IQuizAnswer => {
      return { id: idx, text: itm.text, correct: itm.correct };
    });
    return { id: idx, text: itm.text, answers };
  });
};
export interface IQuizContainerProps {}
export const QuizContainer: React.FC<IQuizContainerProps> = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuizQuestion>();

  useEffect(() => {
    setProgress(getProgress(TOTAL_QUESTIONS, step));
    setCurrentQuestion(provideTmpQuestions()[step]);
  }, [step]);

  console.log("currentQuestion :>> ", currentQuestion);
  return (
    <div className={classes.quiz__container}>
      <div className={classes.quiz__top}>
        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion!.text}
            answers={currentQuestion!.answers}
            selectCallback={() => {}}
          />
        )}
      </div>
      <div className={classes.quiz__bottom}>
        <progress
          id="file"
          max="100"
          value={progress}
          className={classes.quiz__progress}
        />
        <CustomButton
          onClick={() => {
            setStep((prev) => prev + 1);
          }}
          type="filled"
          title="Continue"
        />
      </div>
    </div>
  );
};
