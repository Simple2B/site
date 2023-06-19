import { IsAuthenticated,  OpenAPI,  UsersService } from "@/openapi";
import { log, profile } from "console";
import { Session } from "inspector";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
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
    async jwt({ token, account, profile }) {

      console.log("jwt")


      console.log(token, "token")
      console.log(account, "account")
      console.log(profile, "profile")

      const resBody: IsAuthenticated = {
        username: token.name as string,
        email: token.email as string,
        image_url: token.image as string | undefined,
        git_hub_id: account ? account.providerAccountId : "",
      }

      // try {
      //   const resData = await UsersService.usersIsAuthenticated(resBody)

      //   if (resData) {
      //     token.accessToken = resData.access_token
      //   }
      // } catch (error) {
      //   console.error(`Can't Authenticated user on back, ${error}`)
      // }
      return token
    },
    async session({ session, token }) {
      // session.user.access_token = token.accessToken
      return session
    }
  },
};