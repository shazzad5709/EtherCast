import { JWT } from "next-auth/jwt"
import { User } from "next-auth"
import { UserRole } from '@prisma/client'

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      email: string
      role: UserRole
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: userId
    email: string
    role: UserRole
  }
}