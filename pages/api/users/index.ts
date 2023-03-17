// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../database/conn'
import { deleteUsers, getUsers, postUsers, putUsers } from '../../../database/controller'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo()
  
  const { method } = req

  if(method == 'GET')
    getUsers(req, res)
  else if(method == 'POST')
    postUsers(req, res)
  else if(method == 'PUT')
    putUsers(req, res)
  else if(method == 'DELETE')
    deleteUsers(req, res)
}
