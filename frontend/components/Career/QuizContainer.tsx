import React, { useCallback, useEffect, useState } from "react";
import classes from "./Career.module.scss";

import questions from "../../data/quiz.json";
import { CustomButton } from "../Buttons/CustomButton";
import { QuizQuestion } from "./QuizQuestion";
import { IQuizAnswer, IQuizQuestion } from "../../types/quiz";
import { useRouter } from "next/router";
import { quizApi } from "../../services/quizApi";
import { Results } from "@prisma/client";

const TOTAL_QUESTIONS = 25;
const getProgress = (total: number, current: number) => (current / total) * 100;
const myRandomInts = (quantity: number, max: number) => {
  const set: Set<number> = new Set();
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1);
  }
  return set;
};
const provideTmpQuestions = () => {
  return questions.questions.map((itm, idx): IQuizQuestion => {
    const answers = itm.answers.map((itm, idx): IQuizAnswer => {
      return { id: idx, text: itm.text, correct: itm.correct };
    });
    return { id: idx, text: itm.text, answers };
  });
};

export interface IQuizContainerProps {
  count: number;
  vacancyId: number;
}
export const QuizContainer: React.FC<IQuizContainerProps> = ({
  count,
  vacancyId,
}) => {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questionsNumbers, setQuestionsNumbers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<IQuizQuestion>();
  const [answerId, setAnswerId] = useState<number>(0);

  const selectAnswer = (id: number) => {
    setAnswerId(id);
  };
  const getQuestion = async () => {
    const { question } = await quizApi.getQuestionById(questionsNumbers[step]);
    setCurrentQuestion(question);
  };
  useEffect(() => {
    let totalQuestions = count > TOTAL_QUESTIONS ? TOTAL_QUESTIONS : count;
    const arr = myRandomInts(totalQuestions, count);
    setQuestionsNumbers(Array.from(arr));
  }, []);

  useEffect(() => {
    let totalQuestions = count > TOTAL_QUESTIONS ? TOTAL_QUESTIONS : count;
    setProgress(getProgress(totalQuestions, step));
    if (questionsNumbers.length > 0) getQuestion();
  }, [step, questionsNumbers]);

  // console.log("currentQuestion :>> ", currentQuestion);
  console.log("totalQuestionsInDb :>> ", count);
  console.log("questionsNumbers :>> ", questionsNumbers);
  console.log("vacancy id :>> ", vacancyId);

  const handleSubmitAnswer = () => {
    if (answerId === 0) {
      return;
    }
    const result = {
      questionId: questionsNumbers[step],
      answerId,
      userId: 1,
    };
    // TODO: create new answer in DB
    quizApi.postAnswer(result);
    setAnswerId(0);
    if (step === questionsNumbers.length - 1) {
      router.push(`/careers/apply/contacts/${vacancyId}`);
      return;
    }
    setStep((prev) => prev + 1);
  };

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
        <progress
          id="file"
          max="100"
          value={progress}
          className={classes.quiz__progress}
        />
        <CustomButton
          onClick={handleSubmitAnswer}
          type="filled"
          title="Continue"
        />
      </div>
    </div>
  );
};
