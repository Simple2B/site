import { CandidateService, IsAuthenticated, OpenAPI } from "@/openapi";
import { log, profile } from "console";
import { Session } from "inspector";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";

const GITHUB_ID = process.env.GITHUB_ID || ""
const GITHUB_SECRET = process.env.GITHUB_SECRET || ""
const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET || ""
const NEXT_JWT_SECRET = process.env.NEXT_JWT_SECRET || ""

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
    async jwt({ token }) {

      const resBody: IsAuthenticated = {
        username: token.name!,
        email: token.email!,
        image_url: token.image as string | undefined,
        git_hub_id: token.sub!,
      }

      try {
        const resData = await CandidateService.isAuthenticated(resBody)

        if (resData) {
          token.user_uuid = resData.user_uuid
        }
      } catch (error) {
        console.error(`Can't Authenticated user on back, ${error}`)
      }
      return token
    },
    async session({ session, token }) {
      session.user.user_uuid = token.user_uuid
      return session
    }
  },
};
