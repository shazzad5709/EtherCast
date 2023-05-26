import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "@prisma/client";
import { sendWelcomeEmail } from "../../mailer";
import bcrypt from "bcrypt";
import { linkSync } from "fs";

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
  // else if (req.method === "POST") {
  //   const { name, email } = req.body;
  //   // const hashedPassword = await bcrypt.hash(password, 10);
  //   // Generate an OTP (you can use any library or custom logic to generate the OTP)
  //   const otp = generateOTP();

  //   try {
  //     // Save the user to the database
  //     const user = await prisma.user.create({
  //       data: {
  //         name,
  //         email,
  //         password: "123456",
  //         // other user fields
  //       },
  //     });

  //     // Send the welcome email with the OTP
  //     await sendWelcomeEmail(email, otp);

  //     res.status(200).json({ message: "User created successfully" });
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     res.status(500).json({ error: "Failed to create user" });
  //   }
  // }


// Function to generate OTP (example implementation)

  else if (req.method === "POST") {
    const { name, email, org_name,employee_id } = req.body;
    const hashedPassword = await bcrypt.hash("12345", 10)
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
          password:hashedPassword,
          role: "VOTER",
        },
      });
      console.log("Email is unique");
    }
    const otp = '12345';
    const link = "http://localhost:3000/signin";
    try {
      const voter = await prisma.voter.create({
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
      await sendWelcomeEmail(email, link,otp);
      
      return res.status(200).json({ message: "Voter created successfully" });
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
      res.status(500).json({ error: ' went wrong while deleting voter.' });
    }
    } 
  
  else{
    res.status(405).end();
  }

  function generateOTP() {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }
}
