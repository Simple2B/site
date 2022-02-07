import axios, { AxiosResponse } from "axios";
import { IQuizQuestion, QuizResultItem } from "../types/quiz";

type QuizApi = {
  getQuestionById: (id: number) => Promise<{ question: IQuizQuestion }>;
  postAnswer: (result: QuizResultItem) => Promise<any>;
};
export const quizApi: QuizApi = {
  getQuestionById: async (id: number) => {
    const response: AxiosResponse<{ question: IQuizQuestion }> =
      await axios.get(`/api/quiz/question/${id}`);
    return response.data;
  },
  postAnswer: async (result: QuizResultItem) => {
    const response: AxiosResponse<any> = await axios.post(
      `/api/quiz/question`,
      {
        data: { ...result },
      }
    );
    return response.data;
  },
};
