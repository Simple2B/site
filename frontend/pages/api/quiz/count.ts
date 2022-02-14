// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {
  count: number;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const questionsCount = await prisma.question.count();

  res.status(200).json({ count: questionsCount });
}
