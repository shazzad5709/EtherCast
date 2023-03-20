import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../database/conn'
import { deleteUser, getUsers, postUser, putUser } from '../../../database/controller'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo()
  
  const { method } = req

  if(method == 'GET')
    getUsers(req, res)
  else if(method == 'POST')
    postUser(req, res)
  else if(method == 'PUT')
    putUser(req, res)
  else if(method == 'DELETE')
    deleteUser(req, res)
}
