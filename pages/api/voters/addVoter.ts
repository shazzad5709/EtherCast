// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/conn";
import Voter from "../../../model/voter";


interface ResponseData {
  error?: string;
  msg?: string;
}

const validateForm = async (
 
  email: string,
  firstname: string,
  lastname: string,
  electionCode: string,
) => {

  connectMongo()
  
  const emailUser = await Voter.findOne({ email: email });

  if (emailUser) {
    return { error: "Email already exists" };
  }

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
  const { data } = req.body;
  // console.log(data)

  const errorMessage = await validateForm(
    data.email, 
    data.firstname,
    data.lastname, 
    data.elCode
  );
  if (errorMessage) {
    console.log(errorMessage)
    return res.status(400).json(errorMessage as ResponseData);
  }
  console.log(data)
  const number = Math.floor(Math.random() * 100)
  // create new User on MongoDB
  await Voter.create({
    id: number,
    name: data.firstname+" "+data.lastname,
    email: data.email,
    electioncode:(data.elCode as Number),
  })
  .then(() =>
    res.status(200).json({ msg: "Successfuly created new User: " + Voter })
  )
  .catch((err: string) =>
    res.status(400).json({ error: "Error on '/api/register': " + err })
  );

}