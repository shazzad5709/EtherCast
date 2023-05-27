import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  try {
  //fetch all elections
  const elections = await prisma.election.findMany({
    select: {
      id: true,
      title: true,
      org_name: true
    }
  })
  // console.log(elections)
  return res.status(200).json(elections)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}