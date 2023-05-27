import prisma from '../../../../libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../../libs/serverAuth';
const ethers = require('ethers');

interface ResponseData {
  error?: string;
  msg?: boolean;
}

async function createWallet(privateKey: string) {
  const wallet = ethers.Wallet.createRandom();

  console.log('address:', wallet.address);
  console.log('mnemonic:', wallet.mnemonic.phrase);
  console.log('privateKey:', wallet.privateKey);

  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY);

  const signer = new ethers.Wallet(privateKey, provider);

  const tx = await signer.sendTransaction({
    to: wallet.address, //change this 'address' to wallet.address
    value: ethers.utils.parseEther('0.00001'),
  });

  await tx.wait();
  console.log('sent');
  return wallet;
}

export default async function createCandidate(
  req: NextApiRequest, res: NextApiResponse<ResponseData>
) {
  const { currentUser } = await serverAuth(req, res);

  if (req.method === 'GET') {
    try {
      const voter = await prisma.voter.findUnique(
        {
          where: {
            email: currentUser.email,
          },
        },
      )
      return res.status(200).json({ msg: voter!.walletStatus });
    } catch (error) {
      console.error('Error retrieving voter:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  if (req.method === 'POST') {
    const { password, optionId } = req.body;
    try {
      const user = await prisma.user.update({
        where: {
          email: currentUser.email,
        },
        data: {
          password: password,
        },
      });

      const voter = await prisma.voter.findUnique({
        where: {
          email: currentUser.email,
        },
      });

      const officer = await prisma.officer.findUnique({
        where: {
          id: voter!.officerId!,
        },
      });

      const wallet = await createWallet(officer!.privateKey!);
      // if(typeof window !== 'undefined')
      //   localStorage.setItem('voterPrivateKey', wallet.privateKey);
      
        // localStorage.getItem('voterPrivateKey');

      // const updatedSecret = await prisma.secret.update({
      //   where: {
      //     id: optionId,
      //   },
      //   data: {
      //     status: true,
      //   }
      // });

      return res.status(200).json({ msg: wallet });
    } catch (error) {
      console.error('Error updating voter:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}