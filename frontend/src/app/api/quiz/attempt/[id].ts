// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { IQuizAttempt } from '../../../../types/quiz';

type Data = {
  attempt: IQuizAttempt | null;
};

export default async function attemptHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const id = req.query.id as string;
  const { method } = req;

  if (!id) {
    res.status(400).end(`User id not sent`);
  }

  switch (method) {
    case 'GET':
      const attempt = await prisma.attempt.findMany({
        where: {
          userId: parseInt(id),
        },
        orderBy: {
          id: 'desc',
        },
      });
      res.status(200).json({ attempt: attempt[0] });
      break;
    case 'PUT':
      if (!req.body) {
        res.status(400).end(`Request body not sent`);
      }
      const updatedAttempt = await prisma.attempt.update({
        where: {
          id: parseInt(id),
        },
        data: {
          userId: req.body.userId,
          questions: req.body.questions,
          step: req.body.step,
        },
      });
      res.status(200).json({ attempt: updatedAttempt });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
