import prisma from '../../libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
const { ethers } = require('ethers');
import fs from 'fs'
import serverAuth from '../../libs/serverAuth'

function convertToUint256(hexString: string): string {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }

  const paddedHexString = hexString.padStart(64, '0')

  return '0x' + paddedHexString
}

const abiFile = fs.readFileSync('./contract/abi.json');
const abi = JSON.parse(abiFile.toString());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, regDeadlineDate, voteStartDate, voteEndDate } = req.body

  const { currentUser } = await serverAuth(req, res)

  const chairman = await prisma.chairman.findUnique({
    where: {
      email: currentUser.email,
    },
  })

  const officers = await prisma.officer.findMany({
    where: {
      electionId: chairman!.electionId,
    },
  })

  try {
    const election = await prisma.election.update({
      where: {
        id: chairman!.electionId!,
      },
      data: {
        title: name
      },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY);
  const chairmanWallet = new ethers.Wallet(chairman!.privateKey!, provider)
  const officersWallet = officers.map((officer) => {
    return new ethers.Wallet(officer.privateKey!, provider)
  })

  let officersAddress: string[] = []

  for (const element of officersWallet) {
    officersAddress.push(element.address)
  }

  const election_code = convertToUint256(chairman!.electionId!)

  const signer = new ethers.Wallet(chairman!.privateKey!, provider);
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, abi, signer);

  try {
    const tx = await contract.createElection(
      election_code,
      name,
      regDeadlineDate,
      voteStartDate,
      voteEndDate,
      officersAddress
    )
    await tx.wait()
    console.log('Election created')
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }

  const result = await prisma.chairman.update({
    where: {
      email: currentUser.email,
    },
    data: {
      electionCreated: true,
    },
  }).then(() => {
    console.log('Election created')
    return res.status(200).json({ message: 'Election created successfully' })
  }).catch((error) => {
    console.log(error)
    return res.status(500).json({ message: 'Something went wrong' })
  })
}