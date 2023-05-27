import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  function generateOpenSSLSecret(length: number): string {
    const buffer = crypto.randomBytes(length);
    const secret = buffer.toString('hex');
    return secret;
  }
  
  const secret = generateOpenSSLSecret(32);
  console.log(secret);
  if(typeof window !== 'undefined') {
    localStorage.setItem('secret', secret);
    console.log(localStorage.getItem('secret'));
  }

}
