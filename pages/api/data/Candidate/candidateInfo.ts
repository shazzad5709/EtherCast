import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "@prisma/client";
import serverAuth from "../../../../libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentUser } = await serverAuth(req, res);
 
  if (req.method === "GET") {
    
    try {

      const candidate = await prisma.candidate.findUnique(
        {
          where: {
            email: currentUser.email,
          },
        },
      );
      
      // const candidate = await prisma.candidate.findMany();
     
      if (candidate) {
        return res.status(200).json(candidate);
      } else {
        return res.status(404).json({ message: "Candidate not found" });
      }
    } catch (error) {
      console.error("Error retrieving candidate:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
//   else if (req.method === "POST") {
//     const { name, email, org_name,employee_id } = req.body;

//     let user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (user) {
//       console.log("Email already exists");
//     } else {
//       user = await prisma.user.create({
//         data: {
//           name: name,
//           email: email,
//           password: "123456",
//           role: "CANDIDATE",
//         },
//       });
//       console.log("Email is unique");
//     }

//     try {
//       const officer = await prisma.candidate.create({
//         data: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           symbol: "symbol",
//           agenda: "agenda",
          
//         },
//         include: {
//           user: true,
          
//         }
//       });
      
//       return res.status(200).json({ message: "Candidate created successfully" });
//     } catch (error) {
//       console.log('Error:', error);
//       console.log("kenooo")
//       return res.status(500).json({ message: "Something went wrong" });
//     }
//   }
  else if(req.method === 'DELETE') {
    
    const id = req.query.id;
    try {
      const deletedOfficer = await prisma.officer.delete({
        where: { id: String(id) },
      });

      res.status(200).json("Delete Done");
    } catch (error) {
      res.status(500).json({ error: ' went wrong while deleting chairman.' });
    }
    } 
  
  else{
    res.status(405).end();
  }
}
