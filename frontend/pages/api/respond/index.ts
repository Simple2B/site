// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {};

export default async function respondHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      if (!req.body) {
        res.status(400).end(`Request body not sent`);
      }
      const newRespond = await prisma.respond.create({
        data: {
          userId: req.body.userId,
          vacancyId: req.body.vacancyId,
        },
      });
      res.status(200).json({ ...newRespond });
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
