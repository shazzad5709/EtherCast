import prisma from '../../../libs/prisma';

export default async function handler(req:any, res:any) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, image, password } = req.body;
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          image,
          password,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
