import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';
import nodemailer from 'nodemailer';
import { sendRecoveryEmail } from '../mailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const otp = generateOTP();

      await prisma.oTP.create({
        data: {
          email,
          otp,
          expiresAt: new Date(Date.now() + 2 * 60 * 1000), 
        },
      });

      
      await sendRecoveryEmail(email,otp);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}

function generateOTP() {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
