import React, { useCallback, useEffect, useState } from 'react';
import classes from './Career.module.scss';

import questions from '../../data/quiz.json';
import { CustomButton } from '../Buttons/CustomButton';
import { QuizQuestion } from './QuizQuestion';
import { IQuizAnswer, IQuizAttempt, IQuizQuestion, QuizResultItem } from '../../types/quiz';
import { useRouter } from 'next/router';
import { quizApi } from '../../services/quizApi';
import { Results } from '@prisma/client';
import { localStorageApi } from '../../services/localStorageApi';

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
  userId: number;
}
export const QuizContainer: React.FC<IQuizContainerProps> = ({ count, vacancyId, userId }) => {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questionsNumbers, setQuestionsNumbers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<IQuizQuestion>();
  const [answerId, setAnswerId] = useState<number>(0);
  const [currentAttempt, setCurrentAttempt] = useState<IQuizAttempt | null>(null);

  const selectAnswer = (id: number) => {
    setAnswerId(id);
  };
  const getQuestion = async (localStep?: number) => {
    const { question } = await quizApi.getQuestionById(
      localStep ? localStep : questionsNumbers[step],
    );
    setCurrentQuestion(question);
  };

  const createAttempt = async (questions: number[]) => {
    const attempt = await quizApi.postAttempt(userId, questions, 0);
    setCurrentAttempt(attempt);
  };

  useEffect(() => {
    let totalQuestions = count > TOTAL_QUESTIONS ? TOTAL_QUESTIONS : count;
    const arr = myRandomInts(totalQuestions, count);
    setQuestionsNumbers(Array.from(arr));
    createAttempt(Array.from(arr));
  }, []);

  useEffect(() => {
    let totalQuestions = count > TOTAL_QUESTIONS ? TOTAL_QUESTIONS : count;
    setProgress(getProgress(totalQuestions, step));
    if (questionsNumbers.length > 0) getQuestion();
  }, [step, questionsNumbers]);

  // console.log("currentQuestion :>> ", currentQuestion);
  // console.log("totalQuestionsInDb :>> ", count);
  // console.log("questionsNumbers :>> ", questionsNumbers);
  // console.log("vacancy id :>> ", vacancyId);
  // console.log("attempt :>> ", currentAttempt);

  const handleSubmitAnswer = () => {
    if (answerId === 0 || !currentAttempt) {
      return;
    }
    const result: QuizResultItem = {
      questionId: questionsNumbers[step],
      answerId,
      userId: userId,
      attemptId: currentAttempt.id,
    };
    // TODO: create new answer in DB
    quizApi.postAnswer(result);
    quizApi.updateAttempt(currentAttempt.id, userId, questionsNumbers, step);
    setAnswerId(0);
    if (step === questionsNumbers.length - 1) {
      router.push(`/careers/apply/contacts/${vacancyId}`);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const buttonText = step < questionsNumbers.length - 1 ? 'Continue' : 'Finish';
  const buttonColor = answerId === 0 ? 'outlined' : 'filled';
  return (
    <div className={classes.quiz__container}>
      <div className={classes.quiz__top}>
        {currentQuestion && (
          <QuizQuestion question={currentQuestion} selectCallback={selectAnswer} />
        )}
      </div>
      <div className={classes.quiz__bottom}>
        <CustomButton
          onClick={handleSubmitAnswer}
          type={buttonColor}
          title={buttonText}
          size='large'
          extraClasses={classes.quiz__button}
        />
        <div className={classes.quiz__progress_container}>
          <h4 className={classes.quiz__progress_title}>Progress</h4>
          <progress
            id='file'
            max='100'
            value={progress}
            className={classes.quiz__progress_component}
          />
        </div>
      </div>
    </div>
  );
};
