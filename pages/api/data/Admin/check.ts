import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../../libs/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    const {currentUser} = await serverAuth(req, res);
    try {
      const officer = await prisma.chairman.findUnique({
        where: {
            email: currentUser.email,
        },
      });
      
      if(officer?.electionCreated){
        return res.status(200).json(true);
      }
      else{
        return res.status(200).json(false);
      }
      
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
 
  else {
    res.status(405).end();
  }
}
