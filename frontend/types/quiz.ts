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
