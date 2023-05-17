import prisma from '../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, org_name, employee_id } = req.body;

  try {
    const dataOfficer = await prisma.officer.create({
      data: {
        
        employee_id,
      },
    });
    res.status(200).json({ msg: 'Officer created successfully' });
  } catch (e) {
    console.log('Failure');
  }
}
