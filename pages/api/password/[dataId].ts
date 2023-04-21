import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/conn";
import Account from "../../../model/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo()
  // validate if it is a POST
  if (req.method !== "GET") {
    return res
      .status(200)
      .json({ error: "This API call only accepts GET methods" });
  }

  // get body variables
  // console.log(req.query)
  const { dataId } = req.query
  console.log(dataId)

  const errorMessage = await Account.findById(dataId);
  // if (errorMessage) {
  //   console.log(errorMessage)
  //   // console
  //   return res.status(400).json(errorMessage);
  // }

  return res.status(200).json(errorMessage)
// console.log(email)
}