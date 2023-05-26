import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { toast } from 'react-hot-toast';
import { sendRecoveryEmail, sendWelcomeEmail } from './mailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.APP_PASS,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;
    
    const otp = generateOTP()

    try {
      await sendRecoveryEmail(email,otp);
      console.log('OTP email sent successfully.');

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending OTP email:', error);
      res.status(500).json({ error: 'Failed to send OTP email.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}

function generateOTP() {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }