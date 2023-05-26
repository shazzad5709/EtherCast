import prisma from '../../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
import { sendWelcomeEmail } from '../../mailer';
const ethers = require('ethers');

function generateRandom(min = 12345, max = 98765) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function createWallet() {
  const wallet = ethers.Wallet.createRandom();

  console.log('address:', wallet.address);
  console.log('mnemonic:', wallet.mnemonic.phrase);
  console.log('privateKey:', wallet.privateKey);

  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY);

  const signer = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

  const tx = await signer.sendTransaction({
    to: '0xE23a987239d869d88597fFDd4ed117816B422fA5', //change this 'address' to wallet.address
    value: ethers.utils.parseEther('0.001'),
  });

  await tx.wait();
  console.log('sent');
  return wallet;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const chairman = await prisma.chairman.findMany();

      return res.status(200).json(chairman);
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } 
  
  else if (req.method === 'POST') {
    const { name, email, org_name } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // const hashedPassword = await bcrypt.hash(generateRandom().toString(), 10)
    const hashedPassword = await bcrypt.hash('12345', 10);

    if (user) {
      if (user.role !== UserRole.NONE) {
        return res
          .status(400)
          .json({ message: 'Already in another election' });
      }
      console.log('Email already exists');
      user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          role: UserRole.CHAIRMAN,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: UserRole.CHAIRMAN,
        },
      });
      console.log('Email is unique');
    }

    const wallet = await createWallet();
    const link = "http://localhost:3000/signin";
    const otp = '12345'

    try {
      const election = await prisma.election.create({
        data: {
          org_name: org_name,
        }
      });
      const chairman = await prisma.chairman.create({
        data: {
          org_name: org_name,
          userId: user.id,
          name: user.name,
          email: user.email,
          // privateKey: wallet.privateKey,
          privateKey: '0xE23a987239d869d88597fFDd4ed117816B422fA5',
          //change this private key to the one generated above
          electionId: election.id,
        },
        include: {
          user: true,
          election: true,
        },
      });
      await sendWelcomeEmail(email, link,otp);
      return res
        .status(200)
        .json({ message: 'Chairman created successfully' });
    } catch (error) {
      console.log('Error:', error);
      console.log('kenooo');
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'DELETE') {
    const id = req.query.id;
    try {
      const deletedChairman = await prisma.chairman.delete({
        where: { id: String(id) },
      });

      res.status(200).json('Delete Done');
    } catch (error) {
      res.status(500).json({
        error: 'Something went wrong while deleting chairman.',
      });
    }
  } else {
    res.status(405).end();
  }
}
