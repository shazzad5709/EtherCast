import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const { electionId } = req.query

  try {
    const candidates = await prisma.candidate.findMany({
      where: {
        voter: {
          electionId: electionId?.toString(),
        }
      },
      select: {
        id: true,
        name: true,
        address: true,
        voter: {
          select: {
            user: {
              select: {
                image: true
              }
            },
            election: {
              select: {
                title: true
              }
            }
          }
        }
      }
    });

    return res.status(200).json(candidates);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}