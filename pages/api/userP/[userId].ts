import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method !== 'GET'){
        res.status(405).json({message:'Method not allowed'})
    }

    try {
        const {userId,email} = req.query;

        if(!userId || typeof userId !== 'string'){
            res.status(400).json({message:'Invalid ID'})
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: String(userId)},
        });
        
        console.log(Number(existingUser!.id));
        return res.status(200).json({...existingUser});
    } catch (error) {
        return res.status(400).end();}
}