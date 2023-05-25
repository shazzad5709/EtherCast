import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "../../libs/serverAuth";
import prisma from "../../libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { symbol,agenda , name } = req.body;

    if (!name) {
      throw new Error('Missing fields');
    }

    const updatedUser = await prisma.candidate.update({
      where: {
        id: currentUser.id,
        // email: currentUser.email,
        
      },
      data: {
        name,
        symbol: symbol,
        agenda: agenda,
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}