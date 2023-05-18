import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'
import connectMongo from '../../../database/conn'
import Accounts from "../../../model/account"

const validAdmin = {
  username: "admin",
  password: "admin12@3",
};

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         username: { 
//           label: "Username", 
//           type: "text" 
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         connectMongo()

//         const user = await Accounts.findOne({ 
//           username: credentials?.username 
//         })

//         if(!user)
//           throw new Error("No user found")
        
//         const isPasswordCorrect = await compare(
//           credentials!.password, user.password)

//         // console.log(credentials!.password, " ", user.password, " ", isPasswordCorrect)
        
//         if (!isPasswordCorrect) {
//             throw new Error("Password is incorrect");
//           }

//         user.password = ''
        
//         return user
//       }
//     }),
//   ],
//   session: { strategy: "jwt" },
//   jwt: {
//     secret: process.env.NEXTAUTH_JWT_SECRET,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token }) {
//       // fetch user from db here first  
      
//       return {
//           id: user?.id,
//           username: user?.username,
//           email: user?.email,
//           role: user?.role
//         };
//     },
//     async session({ session, token }) {
//         if (token) {
//           session.user.id = token.id
//           session.user.username = token.username
//           session.user.email = token.email
//           session.user.role = token.role
//         }

//         return session
//     },
//   },
//   pages: {
//       signIn: '/Login',
//   }

  
// })
