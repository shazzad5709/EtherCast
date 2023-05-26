import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { sendWelcomeEmail } from "../../mailer";
import bcrypt from "bcrypt";
import serverAuth from "../../../../libs/serverAuth";
import { UserRole } from "@prisma/client";
import crypto from 'crypto';

function generateOpenSSLSecret(): string {
  const buffer = crypto.randomBytes(10);
  const secret = buffer.toString('hex');
  return secret;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { currentUser } = await serverAuth(req, res);
  const officer = await prisma.officer.findUnique(
    {
      where: {
        email: currentUser.email,
      },
    },
  );

  if (req.method === "GET") {
    try {
      const voters = await prisma.voter.findMany({
        where: {
          electionId: officer!.electionId,
        }
      });

      return res.status(200).json(voters);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  else if (req.method === "POST") {
    const { name, email, org_name, employee_id } = req.body;
    const hashedPassword = await bcrypt.hash("12345", 10)

    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      if (user.role !== UserRole.NONE) {
        return res
          .status(400)
          .json({ message: "Already in another election" });
      }
      console.log("Email already exists");
      user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          role: UserRole.VOTER,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: UserRole.VOTER,
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
          name: user.name,
          email: user.email,
          employee_id: employee_id,
          
          userId: user.id,
          electionId: officer!.electionId,
          officerId: officer!.id,          
        }
      });
      
      await sendWelcomeEmail(email, link, otp);

      const existingSecrets = await prisma.secret.findMany({
        where: {
          electionId: officer!.electionId,
        }
      });

      let generatedSecret = generateOpenSSLSecret();

      while(existingSecrets.some((item) => item.secret === generatedSecret)) {
        generatedSecret = generateOpenSSLSecret();
      }

      const createdSecret = await prisma.secret.create({
        data: {
          secret: generatedSecret,
          electionId: officer!.electionId
        }
      });

      console.log("Created Secret:", createdSecret)

      return res.status(200).json({ message: "Voter created successfully" });
    } catch (error) {
      console.log('Error:', error);
      console.log("createdVoter Line 94")
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  else if (req.method === 'DELETE') {

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

  else {
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
