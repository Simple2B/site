import React from "react";
import { IQuizAnswer } from "../../types/quiz";
import classes from "./Career.module.scss";

export interface IQuizQuestionProps {
  question: string;
  answers: IQuizAnswer[];
  selectCallback: () => void;
}
export const QuizQuestion: React.FC<IQuizQuestionProps> = ({
  question,
  answers,
  selectCallback,
}) => {
  const answerComponents = answers.map((itm) => {
    return (
      <div key={itm.id} className={classes.quiz__answer}>
        <input
          type="radio"
          id={`answer_${itm.id}`}
          name={`question`}
          value={itm.text}
          className={classes.quiz__answer_input}
        />
        <label htmlFor={`answer_${itm.id}`}>{itm.text}</label>
      </div>
    );
  });
  return (
    <div className={classes.quiz__wrapper}>
      <h3 className={classes.quiz__question}>{question}</h3>
      {answerComponents}
    </div>
  );
};
