import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import connectMongo from '../../database/conn';
import Accounts from '../../model/account';

interface ResponseData {
  error?: string;
  msg?: string;
}

function generateRandom(min = 123456, max = 987654) {
  return (Math.floor( Math.random() * (max-min)) + min);
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseData>
) {
  connectMongo()
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.APP_PASS,
    }
  })

  const { subject, email } = req.body

  if (!subject || !email) return res.status(400).json({ error: 'Missing fields' })
  let text = ''
  let random = 0

  if(subject === 'Reset Password') {
    connectMongo()
    const emailUser = await Accounts.findOne({ email: email });

    if (!emailUser) {
      return { error: "Account not found" };
    }
    
    random = generateRandom()
    text = '<p> To reset password, enter the following code in the reset password form: </p> <br> <h1>' + random + '</h1>'
  }

  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: subject,
    text: '',
    html: text
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return res.status(400).json({ error: 'Email not sent' })
    } else {
      return res.status(200).json({ msg: random.toString() })
    }
  })
}