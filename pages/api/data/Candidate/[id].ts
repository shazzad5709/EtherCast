import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
          const candidate = await prisma.candidate.findFirst({
            where: {
              email: req.query.email as string,
            },
          });
      
          if (candidate) {
            return res.status(200).json(candidate);
          } else {
            return res.status(404).json({ message: "Candidate not found" });
          }
        } catch (error) {
          console.error("Error retrieving candidate:", error);
          return res.status(500).json({ message: "Something went wrong" });
        }
      }
      
      
  else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const deletedVoter = await prisma.voter.delete({
        where: { id: String(id) },
      });

      res.status(200).json(deletedVoter);
    } catch (error) {
      res.status(500).json({ error: 'Something WRONG deleting Officer.' });
    }
  } 
  
  else if(req.method === 'PUT'){
    const { id } = req.query;
    const candidate = req.body;
    const { name, agenda, symbol } = candidate;

  try {
    const updatedData = await prisma.candidate.update({
      where: { id: String(id) },
      data: { name, agenda,symbol },
    });
    res.status(200).json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating data.' });
  }
  }
  else {
    res.status(405).end();
  }
}
