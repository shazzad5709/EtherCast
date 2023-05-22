import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    try {
      // console.log("-------------");
      const chairman = await prisma.chairman.findMany();
      // console.log("*************************")
      // console.log(chairman);

      return res.status(200).json(chairman);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const deletedChairman = await prisma.chairman.delete({
        where: { id: String(id) },
      });

      res.status(200).json(deletedChairman);
    } catch (error) {
      res.status(500).json({ error: 'Something WRONG deleting chairman.' });
    }
  } 
  
  else if(req.method === 'PUT'){
    const { id } = req.query;
  const { name, email,org_name } = req.body;

  try {
    const updatedData = await prisma.chairman.update({
      where: { id: String(id) },
      data: { name, email, org_name },
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
