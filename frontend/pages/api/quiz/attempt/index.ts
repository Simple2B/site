// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { IQuizAttempt } from "../../../../types/quiz";

type Data = {
  attempt: IQuizAttempt | null;
};

export default async function attemptHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      if (!req.body) {
        res.status(400).end(`Request body not sent`);
      }
      const newAttempt = await prisma.attempt.create({
        data: {
          userId: req.body.userId,
          questions: req.body.questions,
          step: req.body.step,
        },
      });
      res.status(200).json({ attempt: newAttempt });
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
