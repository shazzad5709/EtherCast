import prisma from '../../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../../libs/serverAuth';

interface ResponseData {
  error?: string;
  msg?: boolean;
}

export default async function createCandidate(
  req: NextApiRequest, res: NextApiResponse<ResponseData>
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
      return res.status(200).json({ msg: voter!.walletStatus });
    } catch (error) {
      console.error('Error retrieving voter:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  if (req.method === 'POST') {
    const { password, optionId } = req.body;
    try {
      const user = await prisma.user.update({
        where: {
          email: currentUser.email,
        },
        data: {
          password: password,
        },
      });

      const voter = await prisma.voter.findUnique({
        where: {
          email: currentUser.email,
        },
      });

      // TODO create voter wallet

      const updatedSecret = await prisma.secret.update({
        where: {
          id: optionId,
        },
        data: {
          status: true,
        }
      });

      // return res.status(200).json({ msg: voter.walletStatus });
    } catch (error) {
      console.error('Error updating voter:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}