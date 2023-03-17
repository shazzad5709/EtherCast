import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'

const validAdmin = {
  username: "admin",
  password: "admin12@3",
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { 
          label: "Username", 
          type: "text" 
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: (credentials) => {
        if(credentials.username != validAdmin.username) {
          throw new Error("Invalid username");
        }
        if(!compare(credentials.password, validAdmin.password)) {
          throw new Error("Invalid password");
        }
      }
    }),
  ],

  callbacks: {
    session({ session, token, user }) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
})
