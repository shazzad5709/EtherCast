// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../Database/conn";
import User from "../../../model/user";


const findUser = async (
    _id:String
  
) => {

  connectMongo()

  const user = await User.findById(_id);

  if (!user) {
    return { error: "Vallage Na" };
  }
//   console.log(emailUser)
  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // validate if it is a POST
  if (req.method !== "GET") {
    return res
      .status(200)
      .json({ error: "This API call only accepts GET methods" });
  }

  // get body variables
  console.log(req)
  const { user } = req.body;
  // console.log(data)

  const errorMessage = await findUser(
    user
  );
  if (errorMessage) {
    console.log(errorMessage)
    // console
    return res.status(400).json(errorMessage);
  }

  return res.status(200).json(user)
// console.log(email)

}