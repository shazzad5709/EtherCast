import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../database/conn";
import Accounts from "../../model/account";
import bcrypt  from 'bcrypt'

interface ResponseData {
  error?: string;
  msg?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  connectMongo()

  if (req.method !== "PUT") {
    return res
      .status(200)
      .json({ error: "This API call only accepts PUT methods" });
  }

  const { email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 12)
  const aa:any = await Accounts.findOneAndUpdate({email: email} , {
     password: hashedPassword,
  }, { new: true }
  )
  .then(() =>
    res.status(200).json({ msg: "OTP stored" })
  )
  .catch((err: string) =>
    res.status(400).json({ error: "Error on '/api/saveOTP': " + err })
  );
}