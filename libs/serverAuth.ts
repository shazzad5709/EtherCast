import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../libs/prisma';
// import NextAuth from '.';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getServerSession(req, res, authOptions);
const { data: session } = useSession();

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  } 

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};

export default serverAuth;