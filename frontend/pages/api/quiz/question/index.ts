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
  const { answerId, questionId, userId }: QuizResultItem = req.body.data;

  if (req.method !== "POST") {
    res.status(405);
  }
  console.log("req.body", req.body);
  const result = await prisma.results.create({
    data: {
      answerId,
      questionId,
      userId,
    },
    include: {
      answer: true,
      question: true,
      user: true,
    },
  });

  console.log("result =>> ", result);

  //   res.status(200);
  res.status(200).json({ result });
}
