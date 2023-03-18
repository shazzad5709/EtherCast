// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../Database/conn";
import Users from "../../../model/user";


interface ResponseData {
  error?: string;
  msg?: string;
}

const validateForm = async (
 
  email: string,
  firstname: string,
  lastname: string,
  role: string,
  electionCode: string,
) => {

  connectMongo()
  
  const emailUser = await Users.findOne({ email: email });

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
    data.elCode,
    data.role
  );
  if (errorMessage) {
    console.log(errorMessage)
    return res.status(400).json(errorMessage as ResponseData);
  }
  console.log(data)
  // create new User on MongoDB
  await Users.create({
    id: 500,
    name: data.firstname+" "+data.lastname,
    email: data.email,
    electioncode:(data.elCode as Number),
    officertype: data.role
  })
  .then(() =>
    res.status(200).json({ msg: "Successfuly created new User: " + Users })
  )
  .catch((err: string) =>
    res.status(400).json({ error: "Error on '/api/register': " + err })
  );

}