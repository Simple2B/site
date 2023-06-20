import React, { useState } from 'react';
import { IQuizAnswer, IQuizAttempt, IQuizQuestion } from '../../types/quiz';
import classes from './Career.module.scss';
import { QuestionOut } from '@/openapi';

export interface IQuizQuestionProps {
  question: QuestionOut;
  selectCallback: (id: number) => void;
}
export const QuizQuestion: React.FC<IQuizQuestionProps> = ({ question, selectCallback }) => {
  return (
    <div className={classes.quiz__wrapper}>
      <h3 className={classes.quiz__question}>{question.text}</h3>

      {question.variants.map((itm) => (
        <div key={itm.id} className={classes.quiz__answer}>
          <input
            type='radio'
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
      ))}
    </div>
  );
};
