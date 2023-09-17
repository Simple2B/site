import { CandidateService, IsAuthenticated } from "@/openapi";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const NEXT_JWT_SECRET = process.env.NEXT_JWT_SECRET || ""

const GITHUB_ID = process.env.GITHUB_ID || ""
const GITHUB_SECRET = process.env.GITHUB_SECRET || ""

const GITHUB_ID_GERMAN = process.env.GITHUB_ID_GERMAN || ""
const GITHUB_SECRET_GERMAN = process.env.GITHUB_SECRET_GERMAN || ""

const REGEX = /(?<=simple2b)\.de/;

export const options = (pathName: string | null = null) => {
  let gitCredentials = {
    clientId: GITHUB_ID,
    clientSecret: GITHUB_SECRET,
  }

  const isGermanDomain = REGEX.test(pathName || '');
  process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_REDIRECT_URL_EN || ""

  if (isGermanDomain || pathName === 'de') {
    process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_REDIRECT_URL_DE || ""

    gitCredentials = {
      clientId: GITHUB_ID_GERMAN,
      clientSecret: GITHUB_SECRET_GERMAN,
    }
  }

  const opt: NextAuthOptions = {
    providers: [
      GitHubProvider(gitCredentials),
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
  }

  return opt;
};
