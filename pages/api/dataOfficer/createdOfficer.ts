import prisma from "../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // return res.status(405).json({ message: 'Method Not Allowed' });
    // }

    const { name, email, org_name, employee_id } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    let userId;
    if (user) {
      // Unique email already exists in the database
      userId = user.id;
      console.log("Email already exists");
    } else {
      // Unique email doesn't exist in the database
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: "123456",
          role: "OFFICER",
        },
      });
      userId = user.id;
      console.log("Email is unique");
    }

    try {
      const officer = await prisma.officer.create({
        data: {
          org_name: org_name,
          employee_id: employee_id,
          userId: userId,
          electionId: "1",
        },
      });
      return res.status(200).json({ message: "Officer created successfully" });
    } catch (error) {
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
