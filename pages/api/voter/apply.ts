// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/conn";
import Application from "../../../model/application";
import bcrypt from 'bcrypt'

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateForm = async (
  username: string,
  email: string,
  password: string,
  name: string,
  usertype: string,
  electionCode: string,
  employeeID: string,
  orgName: string,
  phone: string
) => {

  connectMongo()

  const usernameUser = await Application.findOne({ username: username });

  if (usernameUser) {
    return { error: "Email already exists" };
  }
  
  const emailUser = await Application.findOne({ email: email });

  if (emailUser) {
    return { error: "Email already exists" };
  }

  if (password.length < 5) {
    return { error: "Password must have 5 or more characters" };
  }

  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }

  const { data } = req.body;

  const errorMessage = await validateForm(
    data.username,
    data.email, 
    data.password, 
    data.name, 
    'voter',
    data.electionCode,
    data.employeeID,
    data.orgName,
    data.phone
  );
  if (errorMessage) {
    console.log(errorMessage)
    return res.status(400).json(errorMessage as ResponseData);
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  await Application.create({
    username: data.username,
    usertype: 'voter',
    hashpassword: hashedPassword,
    electionCode: data.elCode,
    name: data.name,
    email: data.email,
    phone: '',
    employeeID: data.emId,
    orgName: data.orgName,
  })
  .then(() =>
    res.status(200).json({ msg: "Successfuly created new User: " + Application })
  )
  .catch((err: string) =>
    res.status(400).json({ error: "Error on '/api/register': " + err })
  );
}