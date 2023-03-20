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
  if (req.method !== "PUT") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }

  const { email, otp } = req.body;

  await OTP.create({
    email: email,
    otp: otp.msg,
    createdAt: new Date(),
  })
  .then(() =>
    res.status(200).json({ msg: "OTP stored" })
  )
  .catch((err: string) =>
    res.status(400).json({ error: "Error on '/api/saveOTP': " + err })
  );

}