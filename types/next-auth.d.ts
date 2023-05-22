import { JWT } from "next-auth/jwt"
import { User } from "next-auth"
import { UserRole } from '@prisma/client'

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      username: string
      email: string
      role: UserRole
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: userId
    username: string
    email: string
    role: UserRole
  }
}