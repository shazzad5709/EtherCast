import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../../libs/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    try {
        const { currentUser } = await serverAuth(req, res);
//   const { secret, messageHashByte, v, r, s } = req.body;

  const chairman = await prisma.voter.findUnique({
    where: {
      email: currentUser.email,
    },
  });
      

      return res.status(200).json(chairman);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
 
  else {
    res.status(405).end();
  }
}
