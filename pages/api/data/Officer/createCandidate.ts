// Import required dependencies
import prisma from '../../../../libs/prisma';
import axios from 'axios';

// Define the Next.js API route
export default async function createCandidate(req:any, res:any) {
  try {
    // Fetch users with role "candidate" from the "user" table
    const candidates = await prisma.user.findMany({
      where: {
        role: 'CANDIDATE',
      },
    });

    const existingUser = await prisma.user.findUnique({ where: { email: req.body.email } });

    // Iterate over the candidates and create corresponding entries in the "candidate" table
    for (const candidate of candidates) {
        if(existingUser?.email == candidate.email){
            break}
      // Create a candidate in the "candidate" table using the required info
      const createdCandidate = await prisma.candidate.create({
        data: {
          name: candidate.name,
          email: candidate.email,
          // employee_id lagbe ig

          voter: {
            connect: { userId: candidate.id },
          },
        },
      });

      // Output the created candidate
      console.log('Created Candidate:', createdCandidate);
    }

    // Send a success response
    res.status(200).json({ message: 'Candidates created successfully.' });
  } catch (error) {
    // Send an error response
    console.error('Error creating candidates:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}
