// pages/api/user.js

import prisma from '../../libs/prisma';

export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    const { email } = req.query;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (user) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ error: 'Failed to check email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
