import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../database/conn'
import { deleteUser, getUser, putUser } from '../../../database/controller'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  connectMongo().catch(err => res.status(405).json(err))
  const { method } = req

  if(method == 'GET')
    getUser(req, res)
  else if(method == 'PUT')
    putUser(req, res)
  else if(method == 'DELETE')
    deleteUser(req, res)
}