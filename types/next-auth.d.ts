import { JWT } from "next-auth/jwt"
import { User } from "./interfaces"
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
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
  }
}