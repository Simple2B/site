// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { IQuizQuestion } from "../../../../types/quiz";

type Data = {
  question: IQuizQuestion | null;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.query.id as string;

  if (!id) {
    res.status(400);
  }
  console.log("id", id);
  const question = await prisma.question.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      answers: true,
    },
  });
  console.log("first", question);

  //   res.status(200);
  res.status(200).json({ question });
}
