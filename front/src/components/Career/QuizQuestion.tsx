import React, { useState } from "react";
import { IQuizAnswer, IQuizAttempt, IQuizQuestion } from "../../types/quiz";
import classes from "./Career.module.scss";
import { QuestionOut } from "@/openapi";

export interface IQuizQuestionProps {
  question: QuestionOut;
}
export const QuizQuestion: React.FC<IQuizQuestionProps> = ({ question }) => {
  return (
    <div className={classes.quiz__wrapper}>
      <h3 className={classes.quiz__question}>{question.text}</h3>

      {question.variants.map((itm) => (
        <div key={itm.id} className={classes.quiz__answer}>
          <input
            type="radio"
            id={`answer_${itm.id}`}
            name={`question`}
            value={itm.id}
            className={classes.quiz__answer_input}
          />
          <label htmlFor={`answer_${itm.id}`}>{itm.text}</label>
        </div>
      ))}
    </div>
  );
};
