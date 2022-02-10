import { Respond, User } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { IQuizAttempt, IQuizQuestion, QuizResultItem } from "../types/quiz";

type QuizApi = {
  getQuestionById: (id: number) => Promise<{ question: IQuizQuestion }>;
  postAnswer: (result: QuizResultItem) => Promise<any>;
  getAttempt: (userId: number) => Promise<IQuizAttempt>;
  postAttempt: (
    userId: number,
    questions: number[],
    step: number
  ) => Promise<IQuizAttempt>;
  updateAttempt: (
    attemptId: number,
    userId?: number,
    questions?: number[],
    step?: number
  ) => Promise<any>;
  updateUser: (
    userId: number,
    phone?: string,
    telegram?: string,
    email?: string
  ) => Promise<User>;
  addUser: (
    name: string,
    email: string,
    phone?: string,
    telegram?: string
  ) => Promise<User>;
  addRespond: (userId: number, vacancyId: number) => Promise<Respond>;
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
  getAttempt: async (userId: number) => {
    const response: AxiosResponse<IQuizAttempt> = await axios.get(
      `/api/quiz/attempt/${userId}`
    );
    return response.data;
  },
  postAttempt: async (userId: number, questions: number[], step: number) => {
    const response: AxiosResponse<any> = await axios.post(`/api/quiz/attempt`, {
      userId,
      questions,
      step,
    });
    return response.data.attempt;
  },
  updateAttempt: async (
    attemptId: number,
    userId?: number,
    questions?: number[],
    step?: number
  ) => {
    const response: AxiosResponse<any> = await axios.put(
      `/api/quiz/attempt/${attemptId}`,
      {
        userId,
        questions,
        step,
      }
    );
    return response.data;
  },
  updateUser: async (
    userId: number,
    phone?: string,
    telegram?: string,
    email?: string
  ) => {
    const response: AxiosResponse<User> = await axios.put(
      `/api/user/${userId}`,
      {
        phone,
        telegram,
        email,
      }
    );
    return response.data;
  },
  addUser: async (
    name: string,
    email: string,
    phone?: string,
    telegram?: string
  ) => {
    const response: AxiosResponse<User> = await axios.post(`/api/user`, {
      name,
      email,
      phone,
      telegram,
    });
    return response.data;
  },
  addRespond: async (userId: number, vacancyId: number) => {
    const response: AxiosResponse<Respond> = await axios.post(`/api/respond`, {
      userId,
      vacancyId,
    });
    return response.data;
  },
};
