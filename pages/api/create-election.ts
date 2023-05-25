import prisma from '../../libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import fs from 'fs'

function convertToUint256(hexString: string): string {
  // Remove leading "0x" if present
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }

  // Pad with zeroes to reach 64 characters
  const paddedHexString = hexString.padStart(64, '0')

  return '0x' + paddedHexString
}

// const s = '646f89b38623a7b41cbbe34e';
// const uint256Value = convertToUint256(s);
// console.log(uint256Value); // Output: 0x0000000000000000000000000000000000000000000000000000000646f89b386

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const abiFile = fs.readFileSync('./contract/abi.json');
  const abi = JSON.parse(abiFile.toString());

  const { name, org_name, start, end, officers } = req.body
  
}