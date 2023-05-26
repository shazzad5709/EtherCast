import prisma from '../../libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
const { ethers } = require('ethers')
import fs from 'fs'
import serverAuth from '../../libs/serverAuth'

const abiFile = fs.readFileSync('./contract/abi.json')
const abi = JSON.parse(abiFile.toString())

function convertToUint256(hexString: string): string {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }

  const paddedHexString = hexString.padStart(64, '0')

  return '0x' + paddedHexString
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const { currentUser } = await serverAuth(req, res)

  const chairman = await prisma.chairman.findUnique({
    where: {
      email: currentUser.email,
    },
  })

  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY)
  const election_code = convertToUint256(chairman!.electionId!)
  // console.log('election_code:', election_code)
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, abi, provider)
  
  try {
    const index = await contract.getElection(election_code)
    const election = await contract.elections(index)
    console.log('electionCode:', election.electionCode)
    console.log('electionName:', election.electionName)

    return res.status(200).json({ election })
  } catch (error) {
    console.error('Error retrieving election information:', error)
    throw error
  }

}