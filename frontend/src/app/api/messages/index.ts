// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

type Data = {};

export default async function messagesHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;

  switch (method) {
    case 'POST':
      if (!req.body) {
        res.status(400).end(`Request body not sent`);
      }
      const newMessage = await prisma.messages.create({
        data: {
          name: req.body.name ? req.body.name : null,
          email: req.body.email ? req.body.email : null,
          phone: req.body.phone ? req.body.phone : null,
          message: req.body.message ? req.body.message : null,
        },
      });
      res.status(200).json({ ...newMessage });
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
