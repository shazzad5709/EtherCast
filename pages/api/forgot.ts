// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req:any,
  res: any
) {
    let token = 'w23ruahwetjkh29387r'
    let email = '';
    email = `We have sent this email in response to your request to reset your password on Ethercast.com. 
    
    To reset your password, please follow the link below:
    
    <a href="https://EtherCast.com">Click here to rest your password</a>
    <br/><br/>
    We recommend that you keep your password secure and not share it with anyone.
    If you feel your password has been compromised, you can change it by going to your 
    My Account Page and clicking on the "Change Email Address or Password" link.
    <br/><br/> `
//   res.status(200).json({ name: 'John Doe' })
}
