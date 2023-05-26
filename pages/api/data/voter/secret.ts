import prisma from '../../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../../libs/serverAuth';
import { Secret } from '@prisma/client';

interface Response {
  secret?: Secret[],
  error?: string
}
export default async function createCandidate(
  req: NextApiRequest, res: NextApiResponse<Response>,
) {
  const { currentUser } = await serverAuth(req, res);

  if (req.method === 'GET') {
    try {
      const voter = await prisma.voter.findUnique(
        {
          where: {
            email: currentUser.email,
          },
        },
      )
      
      const secrets = await prisma.secret.findMany({
        where: {
          electionId: voter!.electionId,
          status: false
        },
      });
      return res.status(200).json({ secret: secrets });
    } catch (error) {
      console.error('Error retrieving voter:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}