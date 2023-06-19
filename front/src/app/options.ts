import { profile } from "console";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const GITHUB_ID = process.env.GITHUB_ID || ""
const GITHUB_SECRET = process.env.GITHUB_SECRET || ""
const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET || ""
const NEXT_JWT_SECRET = process.env.NEXT_JWT_SECRET || ""


// console.log(GITHUB_ID, GITHUB_SECRET)

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    ],
    // pages: {
    //   signIn:"/auth/sign-in"
    // },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: NEXT_JWT_SECRET,
  },
  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, "user", account, profile, credentials)
      return true
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {

      // console.log("session", session)
      return session
    }
  }
};