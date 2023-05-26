import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';
import cleanupExpiredOTPRecords from './cleanUp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { otp, email } = req.body;

    try {
      const otpRecord = await prisma.oTP.findUnique({
        where: {
          email,
        },
      });

      if (otpRecord && otpRecord.otp === otp) {
        setInterval(cleanupExpiredOTPRecords, 2 * 60 * 1000); 
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error checking OTP:', error);
      res.status(500).json({ error: 'Failed to check OTP' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
