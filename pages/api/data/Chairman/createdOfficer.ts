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
      const chairman = await prisma.officer.findMany();
      // console.log("*************************")
      // console.log(chairman);

      return res.status(200).json(chairman);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  else if (req.method === "POST") {
    const { name, email, org_name, employee_id } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    let userId;
    if (user) {
      userId = user.id;
      console.log("Email already exists");
    } else {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: "123456",
          role: 'OFFICER',
        },
      });
      userId = user.id;
      console.log("Email is unique");
    }

    try {
      console.log(userId)
      const officer = await prisma.officer.create({
        data: {
          org_name: org_name,
          employee_id: employee_id,
          userId: userId,
          electionId: "646510f54b0f7684c56f21bf",
        },
        include: {
          user: true,
        }
      });
      return res.status(200).json({ message: "Officer created successfully" });
    } catch (error) {
      console.log("kenooo")
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  else if(req.method === 'DELETE') {
    
    const id = req.query.id;
    try {
      const deletedOfficer = await prisma.officer.delete({
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
