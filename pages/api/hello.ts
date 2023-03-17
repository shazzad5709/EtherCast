import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../database/conn'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo()
  res.status(200).json({ name: 'John Doe' })
}
