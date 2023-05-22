import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'
import prisma from "../../../libs/prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email" 
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        if(!user)
          throw new Error("No user found")
        
        const isPasswordCorrect = await compare(
          credentials!.password, user.password)

        // console.log(credentials!.password, " ", user.password, " ", isPasswordCorrect)
        
        if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
          }

        user.password = ''
        
        return user
      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if(!dbUser) {
        token.id = user!.id
        return token
      }

      return {
          id: dbUser.id,
          email: dbUser.email,
          role: dbUser.role
        };
    },
    async session({ token, session }) {
        if (token) {
          session.user.id = token.id
          session.user.email = token.email
          session.user.role = token.role
        }

        return session
    },
  },
  pages: {
      signIn: '/Login',
  }

  
})
