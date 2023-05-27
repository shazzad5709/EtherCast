import prisma from '../../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
import { sendCandidateEmail, sendWelcomeEmail } from '../../mailer';
const ethers = require('ethers');



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const chairman = await prisma.candidate.findMany();

      return res.status(200).json(chairman);
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } 
  
  else if (req.method === 'POST') {
    const { name, email } = req.body;
    console.log("candidate+++++++++++++++")
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // const hashedPassword = await bcrypt.hash(generateRandom().toString(), 10)
    const hashedPassword = await bcrypt.hash('12345', 10);

    if (user) {
      if (user.role === UserRole.CANDIDATE ) {
        return res
          .status(400)
          .json({ message: 'Already in another election' });
      }
      console.log('Email already exists');
      // console.log("candidate==============")
      if(user.role === UserRole.VOTER){
      user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          role: UserRole.CANDIDATE,
        },
      });

      const link = "http://localhost:3000/signin";
      const otp = '12345'
  
      try {
        // const election = await prisma.election.create({
        //   data: {
        //     org_name: org_name,
        //   }
        // });
        const candidate = await prisma.candidate.create({
          data: {
            name,
            email,
            
            voter: {
              connect: { email:email }, // Connect the candidate to the corresponding voter using the voterId
            },
          },
        });       
        await sendWelcomeEmail(email, link,otp);
        await sendCandidateEmail(email, link,otp);
        return res
          .status(200)
          .json({ message: 'Candidate created successfully' });
      } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
    
     else {
      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: UserRole.CANDIDATE,
        },
      });
      console.log('Email is unique');
      console.log("candidate==============")
    }

    
   
  } else if (req.method === 'DELETE') {
    const id = req.query.id;
    try {
      const deletedChairman = await prisma.candidate.delete({
        where: { id: String(id) },
      });

      res.status(200).json('Delete Done');
    } catch (error) {
      res.status(500).json({
        error: 'Something went wrong while deleting candidate.',
      });
    }
  } else {
    res.status(405).end();
  }
}
