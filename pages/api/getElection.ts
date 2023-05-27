import prisma from '../../libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
const { ethers } = require('ethers')
import fs from 'fs'
import serverAuth from '../../libs/serverAuth'
import { UserRole } from '@prisma/client'

interface Election {
  electionCode: string
  electionName: string
  regDeadlineDate: string
  voteStartDate: string
  voteEndDate: string
  chairman: string
}

const abiFile = fs.readFileSync('./contract/abi.json')
const abi = JSON.parse(abiFile.toString())

function convertToUint256(hexString: string): string {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }

  const paddedHexString = hexString.padStart(64, '0')

  return '0x' + paddedHexString
}

function convertToString(hexString: string): string {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }

  return hexString
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const { currentUser } = await serverAuth(req, res)

  // 1. search in user by email
  // 2. get userrole
  // 3. search for electionId according to role

  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email,
    },
  })

  let query;

  if(user!.role === UserRole.CHAIRMAN) {
    query = await prisma.chairman.findUnique({
      where: {
        email: currentUser.email,
      },
    })
  } else if(user!.role === UserRole.VOTER || user!.role === UserRole.CANDIDATE) {
    query = await prisma.voter.findUnique({
      where: {
        email: currentUser.email,
      },
    })
  } else if(user!.role === UserRole.OFFICER) {
    query = await prisma.officer.findUnique({
      where: {
        email: currentUser.email,
      },
    })
  }

  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY)
  const election_code = convertToUint256(query!.electionId!)
  // console.log('election_code:', election_code)
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, abi, provider)
  
  try {
    const index = await contract.getElection(election_code)
    const election = await contract.elections(index)
    // console.log(election.chairman)
    // console.log(Date.now())

    const _election: Election = {
      electionCode: convertToString(election.electionCode._hex),
      electionName: election.electionName,
      regDeadlineDate: parseInt(election.registrationDeadline._hex, 16).toString(),
      voteStartDate: parseInt(election.votingStartTime._hex, 16).toString(),
      voteEndDate: parseInt(election.votingEndTime._hex, 16).toString(),
      chairman: election.chairman,
    }

    console.log(_election)

    return res.status(200).json({ _election })
  } catch (error) {
    console.error('Error retrieving election information:', error)
    throw error
  }

}