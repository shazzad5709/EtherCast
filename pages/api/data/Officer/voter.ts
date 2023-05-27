import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../../libs/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    try {
        const { currentUser } = await serverAuth(req, res);
//   const { secret, messageHashByte, v, r, s } = req.body;

  const chairman = await prisma.voter.findMany()
      

      return res.status(200).json(chairman);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  else if (req.method === 'DELETE') {
    
    const { id } = req.query;
    try {
      const deletedOfficer = await prisma.officer.delete({
        where: { id: String(id) },
      });

      res.status(200).json(deletedOfficer);
    } catch (error) {
      res.status(500).json({ error: 'Something WRONG deleting Officer.' });
    }
  } 
  
 
  else {
    res.status(405).end();
  }
}
