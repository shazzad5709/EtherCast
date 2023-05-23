import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "../../libs/serverAuth";
import prisma from "../../libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { name,profileImage,password } = req.body;

    if (!name) {
      throw new Error('Missing fields');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image: profileImage,
        password,
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}