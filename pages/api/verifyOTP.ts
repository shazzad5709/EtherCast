// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../database/conn";
import OTP from "../../model/otp";

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

  const { email, otp } = req.body;

  const obj = await OTP.findOneAndDelete({
    email: email,
  }).lean()

  if (obj.otp === otp) {
    return res.status(200).json({ msg: "correct OTP" })
  } else {
    return res.status(400).json({ error: "wrong OTP"})
  }
}