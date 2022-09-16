// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Results } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { IQuizQuestion, QuizResultItem } from "../../../../types/quiz";

type Data = {
  result: { answerId: number; questionId: number; userId: number | null };
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { answerId, questionId, userId, attemptId }: QuizResultItem =
    req.body.data;
  const { method } = req;

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
  const result = await prisma.results.create({
    data: {
      answerId,
      questionId,
      userId,
      attemptId,
    },
    include: {
      answer: true,
      question: true,
      user: true,
      attempt: true,
    },
  });

  res.status(200).json({ result });
}
