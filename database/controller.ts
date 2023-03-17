import { NextApiRequest, NextApiResponse } from "next";
import Accounts from "../model/account";


export async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await Accounts.find({})

    if(!users) return res.status(404).json({ error: "No users found" })
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({error: "boo"});
  }
}

export async function postUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formData = req.body
    if(!formData) return res.status(404).json({ error: "Form Data Not Provided." })
    Accounts.create(formData)
    res.status(200).json(formData)
  } catch (error) {
    res.status(404).json({error});
  }
}

export async function putUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query
    const formData = req.body

    if(userId && formData) {
      await Accounts.findByIdAndUpdate(userId, formData)
      res.status(200).json(formData)
    }
    res.status(404).json({error: "No username or form data provided."})
  } catch (error) {
    res.status(404).json({error});
  }
}

export async function deleteUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query

    if(userId){
      await Accounts.findByIdAndDelete(userId)
      res.status(200).json({message: "User deleted."})
    }
  } catch (error) {
    res.status(404).json({error});
  }
}