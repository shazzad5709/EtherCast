import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    try {
      // console.log("-------------");
      const voter = await prisma.user.findMany();
      // console.log("*************************")
      // console.log(chairman);

      return res.status(200).json(voter);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  else if (req.method === 'PUT') {
    const { id } = req.query;
    const { role } = req.body;
    
  
    try {
      const existingUser = await prisma.voter.findUnique({ where: { id:id as string } });
      
      if (!existingUser) {
        console.log("TUMI USER NA KENOOOOOO AJIB");
        console.log(id, role);
        return res.status(404).json({ message: 'User not found.' });
      }

      const updatedUser = await prisma.user.update({
        where: { id: existingUser.userId },
        data: { role:role },
      });

      const updatedVoter = await prisma.voter.update({
        where: { id: id as string },
        data: { isCandidate: true },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating the user role.' });
    }
  }

  else {
    res.status(405).end();
  }
}
