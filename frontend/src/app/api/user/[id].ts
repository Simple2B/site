// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

type Data = {};

export default async function attemptHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const id = req.query.id as string;
  const { method } = req;

  if (!id) {
    res.status(400).end(`User id not sent`);
  }

  switch (method) {
    case 'GET':
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json({ ...user });
      break;
    case 'PUT':
      if (!req.body) {
        res.status(400).end(`Request body not sent`);
      }
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          phone: req.body.phone ? req.body.phone : null,
          telegram: req.body.telegram ? req.body.telegram : null,
          email: req.body.email ? req.body.email : null,
        },
      });
      res.status(200).json({ ...updatedUser });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
