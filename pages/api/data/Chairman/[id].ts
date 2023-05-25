import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    try {
      const officer = await prisma.officer.findMany();

      return res.status(200).json(officer);
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
  
  else if(req.method === 'PUT'){
    const { id } = req.query;
  const { name, email,org_name,employee_id } = req.body;

  try {
    const updatedData = await prisma.officer.update({
      where: { id: String(id) },
      data: { name, email, org_name,employee_id },
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
