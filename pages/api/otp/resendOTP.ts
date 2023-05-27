import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';
import { sendRecoveryEmail } from '../mailer';
import { toast } from 'react-hot-toast';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const existingOTP = await prisma.oTP.findUnique({
        where: {
          email: email,
        },
      });

      if (existingOTP && existingOTP.expiresAt > new Date()) {
        toast.error('OTP already sent. Please wait for 1 minute before resending.');
        res.status(400).json({ error: 'OTP already sent. Please wait for 1 minute before resending.' });
        return;
      }

      const otp = generateOTP();

      if (existingOTP) {
        
        if (existingOTP.expiresAt > new Date()) {
            toast.error('OTP already sent. Please wait for 1 minute before resending.');
          // Update the existing OTP record
          await prisma.oTP.update({
            where: {
              id: existingOTP.id,
            },
            data: {
              otp,
              expiresAt: new Date(Date.now() + 1 * 60 * 1000), // Set the expiration time to 1 minute from now
            },
          });
        } else {
          // Delete the expired OTP record
          await prisma.oTP.delete({
            where: {
              id: existingOTP.id,
            },
          });

          // Create a new OTP record
          await prisma.oTP.create({
            data: {
              email,
              otp,
              expiresAt: new Date(Date.now() + 1 * 60 * 1000), // Set the expiration time to 1 minute from now
            },
          });
        }
      } else {
        // Create a new OTP record
        await prisma.oTP.create({
          data: {
            email,
            otp,
            expiresAt: new Date(Date.now() + 1 * 60 * 1000), // Set the expiration time to 1 minute from now
          },
        });
      }
      toast.success('OTP sent successfully');

      await sendRecoveryEmail(email, otp); // Send the recovery email with the new OTP

      res.status(200).json({ success: true });
    } catch (error) {
      
    toast.error('OTP already sent. Please wait for 1 minute before resending.');
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
