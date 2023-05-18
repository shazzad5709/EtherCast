import prisma from "../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "@prisma/client";

export default async function handler(

  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, org_name } = req.body;

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
          role: "CHAIRMAN",
        },
      });
      console.log("Email is unique");
    }

    try {
      const officer = await prisma.chairman.create({
        data: {
          org_name: org_name,
          userId: user.id,
         
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
  if (req.method === "GET") {
    const { electionId } = req.query;
    let id = electionId as string;

    try {
      const users = await prisma.officer.findMany({
        where: { electionId: id },
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
