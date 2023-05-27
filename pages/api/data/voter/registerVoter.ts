import prisma from '../../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../../libs/serverAuth';
const ethers = require('ethers');
import fs from 'fs'

const abiFile = fs.readFileSync('./contract/abi.json');
const abi = JSON.parse(abiFile.toString());

function convertToUint256(hexString: string): string {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }

  const paddedHexString = hexString.padStart(64, '0')

  return '0x' + paddedHexString
}

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { currentUser } = await serverAuth(req, res);
  const { secret, voterAddress, messageHashByte, v, r, s } = req.body;

  const voter = await prisma.voter.findUnique({
    where: {
      email: currentUser.email,
    },
  });

  const secretExists = await prisma.secret.findFirst({
    where: {
      secret: secret,
      electionId: voter!.electionId,
    },
  });

  if (!secretExists) {
    return res.status(500).json({ message: 'Secret does not exist' });
  }

  const officer = await prisma.officer.findUnique({
    where: {
      id: voter!.officerId!,
    },
  });

  const election_code = convertToUint256(voter!.electionId!)
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY);
  const signer = new ethers.Wallet(officer!.privateKey!, provider);
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, abi, signer);

  try {
    const tx = await contract.registerVoter(election_code, voterAddress, messageHashByte, v, r, s);
    await tx.wait();
  } catch (error) {
    return res.status(500).json({ message: 'Voter could not be registered' });
  }

  if (voter!.isCandidate === true) {
    try {
      const tx = await contract.registerCandidate(election_code, voterAddress);
      await tx.wait();

      const candidate = await prisma.candidate.update({
        where: {
          id: voter!.candidateId!,
        },
        data: {
          address: voterAddress,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: 'Candidate could not be registered' });
    }
  }

  try {
    const updatedVoter = await prisma.voter.update({
      where: {
        id: voter!.id,
      },
      data: {
        walletStatus: true,
      },
    }); 

    const updatedSecret = await prisma.secret.update({
      where: {
        id: secretExists.id,
      },
      data: {
        status: true,
      },
    });
  }
  catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  } 
}