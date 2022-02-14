import React, { useState } from "react";
import { IQuizAnswer, IQuizAttempt, IQuizQuestion } from "../../types/quiz";
import classes from "./Career.module.scss";

export interface IQuizQuestionProps {
  question: IQuizQuestion;
  selectCallback: (id: number) => void;
}
export const QuizQuestion: React.FC<IQuizQuestionProps> = ({
  question,
  selectCallback,
}) => {
  const answerComponents = question.answers.map((itm) => {
    return (
      <div key={itm.id} className={classes.quiz__answer}>
        <input
          type="radio"
          id={`answer_${itm.id}`}
          name={`question`}
          value={itm.text}
          className={classes.quiz__answer_input}
          onChange={() => {
            selectCallback(itm.id);
          }}
        />
        <label htmlFor={`answer_${itm.id}`}>{itm.text}</label>
      </div>
    );
  });
  // console.log("question inside :>> ", question);
  return (
    <div className={classes.quiz__wrapper}>
      <h3 className={classes.quiz__question}>{question.text}</h3>
      {answerComponents}
    </div>
  );
};
