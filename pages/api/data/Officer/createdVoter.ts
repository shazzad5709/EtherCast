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
      const voters = await prisma.voter.findMany();
      // console.log("*************************")
      // console.log(chairman);

      return res.status(200).json(voters);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  else if (req.method === "POST") {
    const { name, email, org_name,employee_id } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      console.log("Email already exists");
    } else {
      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: "123456",
          role: "VOTER",
        },
      });
      console.log("Email is unique");
    }

    try {
      const officer = await prisma.voter.create({
        data: {
          org_name: org_name,
          userId: user.id,
          name: user.name,
          email: user.email,
          employee_id:employee_id,
        
        },
        include: {
          user: true,
          
        }
      });
      
      return res.status(200).json({ message: "Chairman created successfully" });
    } catch (error) {
      console.log('Error:', error);
      console.log("kenooo")
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
