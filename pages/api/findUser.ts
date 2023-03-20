import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../database/conn";
import Accounts from "../../model/account";

interface ResponseData {
  error?: string;
  msg?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  connectMongo()
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }

  const { email } = req.body;
  console.log(email);
  

  const k = await Accounts.findOne({
    email: email,
  }).lean()
  console.log(k);
  
  if(k !== null)
    return res.status(200).json({ msg: "User Found" })
  else
    return res.status(400).json({ error: "Account not found"})
}