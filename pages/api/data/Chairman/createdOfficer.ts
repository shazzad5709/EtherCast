import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';
import { useSession } from "next-auth/react";
import serverAuth from "../../../../libs/serverAuth";
const ethers = require('ethers');

async function createWallet(privateKey: string) {
  const wallet = ethers.Wallet.createRandom();

  console.log('address:', wallet.address);
  console.log('mnemonic:', wallet.mnemonic.phrase);
  console.log('privateKey:', wallet.privateKey);

  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY);

  const signer = new ethers.Wallet(privateKey, provider);

  const tx = await signer.sendTransaction({
    to: '0x350BB0fa9c3D0cCDacA225391a7017683b5B026C', //change this 'address' to wallet.address
    value: ethers.utils.parseEther('0.0001'),
  });

  await tx.wait();
  console.log('sent');
  return wallet;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentUser } = await serverAuth(req, res);
  const chairman = await prisma.chairman.findUnique(
    {
      where: {
        email: currentUser.email,
      },
    },
  );

  if (req.method === "GET") {
    try {
      const officers = await prisma.officer.findMany({
        where: {
          electionId: chairman!.electionId,
        },
      });

      return res.status(200).json(officers);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  else if (req.method === "POST") {
    const { name, email, org_name, employee_id } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // const hashedPassword = await bcrypt.hash(generateRandom().toString(), 10)
    const hashedPassword = await bcrypt.hash("12345", 10)

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
          role: UserRole.OFFICER,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: UserRole.OFFICER,
        },
      });
      console.log("Email is unique");
    }

    const wallet = await createWallet(chairman!.privateKey!);

    try {
      const officer = await prisma.officer.create({
        data: {
          org_name: org_name,
          userId: user.id,
          name: user.name,
          email: user.email,
          employee_id: employee_id,
          electionId: chairman!.electionId,
          privateKey: '0x0dbead782cf06db0b2dbfce8d601a2d3961958513b440a72b6229284e1200fc1'
        },
        include: {
          user: true,
          election: true,
        }
      });
      
      return res.status(200).json({ message: "Officer created successfully" });
    } catch (error) {
      console.log('Error:', error);
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
