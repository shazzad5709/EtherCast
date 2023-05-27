import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from '../../../libs/serverAuth'
import prisma from '../../../libs/prisma'

interface ResponseData {
  error?: string;
  candidates?: any;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
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
            walletStatus: true,
            electionId: voter!.electionId
          }
        }
      })
      // console.log(candidates);
      return res.status(200).json({ candidates: candidates });
    } catch (error) {
      // console.error('Error retrieving candidates:', error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}