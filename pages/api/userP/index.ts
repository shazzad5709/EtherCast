import { NextApiRequest,NextApiResponse } from "next";
import prisma from "../../../libs/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    // const {id} = req.query;
    if(req.method !== 'GET'){
        res.status(405).json({message:'Method not allowed'})
    }

    try {
        const user = await prisma.user.findMany()
        res.status(200).json(user)
    }
     catch (error) {
        
    }
}
