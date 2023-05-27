import prisma from '../../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../../libs/serverAuth';
import bcrypt from 'bcrypt';

interface ResponseData {
  error?: string;
  msg?: boolean;
  key?: string;
}

export default async function handler(
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
      // console.log(voter!.walletStatus);
      return res.status(200).json({ msg: voter!.walletStatus });
    } catch (error) {
      console.error('Error retrieving voter:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }


  if (req.method === 'POST') {
    const { password, optionId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.update({
        where: {
          email: currentUser.email,
        },
        data: {
          password: hashedPassword,
        },
      });

      const voter = await prisma.voter.findUnique({
        where: {
          email: currentUser.email,
        },
      });

      const officer = await prisma.officer.findUnique({
        where: {
          id: voter!.officerId!,
        },
      });

      return res.status(200).json({ key: officer!.privateKey! });
    } catch (error) {
      console.error('Error updating voter:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}