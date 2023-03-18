// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../Database/conn";
import User from "../../../model/user";
// import bcrypt from 'bcrypt'

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateForm = async (
  email: string,
  
) => {

  connectMongo()

  const emailUser = await User.findOne({ email: email });

  if (!emailUser) {
    return { error: "Email not found" };
  }
//   console.log(emailUser)
  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }

  // get body variables
  const { email } = req.body;
  // console.log(data)

  const errorMessage = await validateForm(
    email
  );
  if (errorMessage) {
    console.log(errorMessage)
    return res.status(400).json(errorMessage as ResponseData);
  }

//   return res.status(200).json(email)
// console.log(email)

}