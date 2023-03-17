// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

const KEY = '12code';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(!req.body){
        res.statusCode = 404
        res.end('Error')
        return
    }

    const {uname,code,pswd} = req.body;
//   res.status(200).json({ name: 'John Doe' })

    res.json({
        token: jwt.sign({
            uname,
            admin: uname ==='admin' && pswd==='12@3' && code==='1245'
        }, KEY)
    })
}
