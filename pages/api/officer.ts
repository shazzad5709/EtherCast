import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get all officers
      const officers = await prisma.officer.findMany({
        include: {
          user: true,
          election: true,
        },
      });
      res.status(200).json(officers);
      break;
    case 'POST':
      // Create a new officer
      const newOfficer = await prisma.officer.create({
        data: {
          ...req.body,
          userId: {
            connect: { id: req.body.userId },
          },
          electionId: {
            connect: { id: req.body.electionId },
          },
        },
      });
      res.status(201).json(newOfficer);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
