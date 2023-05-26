import prisma from '../../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendCandidateEmail, sendWelcomeEmail } from '../../mailer';

export default async function createCandidate(req:NextApiRequest, res:NextApiResponse) {
 
  try {
    const candidates = await prisma.user.findMany({
      where: {
        role: 'CANDIDATE',
      },
    });

    for (const candidate of candidates) {
      const existingCandidate = await prisma.candidate.findUnique({ where: { email: candidate.email } });
      
      if (existingCandidate) {
        continue;
      }
      
      const createdCandidate = await prisma.candidate.create({
        data: {
          name: candidate.name,
          email: candidate.email,
          voter: {
            connect: { userId: candidate.id },
          },
        },
      });

      console.log('Created Candidate:', createdCandidate);
    }
    
    res.status(200).json({ message: 'Candidates created successfully.' });
  } catch (error) {
    console.error('Error creating candidates:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}
