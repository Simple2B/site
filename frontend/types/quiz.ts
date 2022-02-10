export type IQuizQuestion = {
  id: number;
  text: string;
  answers: IQuizAnswer[];
};

export type IQuizAnswer = {
  id: number;
  text: string;
  correct: boolean;
};

export type QuizResultItem = {
  questionId: number;
  answerId: number;
  userId: number;
  attemptId: number;
};

export interface IQuizAttempt {
  id: number;
  createdAt: Date;
  userId: number;
  questions: number[];
  step: number;
}
