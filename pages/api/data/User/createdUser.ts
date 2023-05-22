import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET") {

    try {
      // console.log("-------------");
      const voters = await prisma.user.findMany();
      // console.log("*************************")
      // console.log(chairman);

      return res.status(200).json(voters);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  
  else if(req.method === 'DELETE') {
    
    const id = req.query.id;
    try {
      const deletedOfficer = await prisma.voter.delete({
        where: { id: String(id) },
      });

      res.status(200).json("Delete Done");
    } catch (error) {
      res.status(500).json({ error: ' went wrong while deleting chairman.' });
    }
    } 
  
  else{
    res.status(405).end();
  }
}
