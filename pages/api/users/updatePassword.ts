import prisma from '../../../libs/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req:any, res:any) {
  if (req.method === 'PUT') {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash('password', 10);

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the password for the user
      await prisma.user.update({
        where: { email },
        data: {
          password:hashPassword, // Assuming the user schema has a 'password' field
        },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Failed to update password' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
