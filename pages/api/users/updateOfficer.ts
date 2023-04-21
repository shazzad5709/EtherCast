// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/conn";
import Users from "../../../model/user";

interface ResponseData {
  error?: string;
  msg?: string;
}

const updateUserData = async (
  email: string,
  firstname: string,
  lastname: string,
  role: string,
  electionCode: string,
) => {
  connectMongo();
  
  // find user with the given email
  const user = await Users.findOne({ email: email });
  if (!user) {
    return { error: "User not found" };
  }

  else{
    
  }

  // update user data
  user.firstname = firstname;
  user.lastname = lastname;
  user.role = role;
  user.electionCode = electionCode;

  // save updated user data
  await user.save();

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

  const errorMessage = await updateUserData(
    data.email,
    data.firstname,
    data.lastname,
    data.role,
    data.elCode
  );

  if (errorMessage) {
    console.log(errorMessage);
    return res.status(400).json(errorMessage as ResponseData);
  }

  return res.status(200).json({ msg: "Successfully updated user data" });
}
