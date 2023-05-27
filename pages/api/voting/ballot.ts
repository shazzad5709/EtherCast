import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from '../../../libs/serverAuth'
import prisma from '../../../libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentUser } = await serverAuth(req, res);

  if (req.method === 'GET') {
    try {
      const voter = await prisma.voter.findUnique({
        where: {
          email: currentUser.email
        }
      })

      const candidates = await prisma.candidate.findMany({
        where: {
          voter: {
            walletStatus: true
          }
        },
        include: {
          voter: {
            select: {
              electionId: true,
              user: {
                select: {
                  image: true
                }
              }
            }
          }
        }
      });
      // console.log(candidates);
      return res.status(200).json(candidates);
    } catch (error) {
      // console.error('Error retrieving candidates:', error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}