import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "../../../lib/prisma";
import { UsersService, AuthenticationService,OpenAPI } from "../backend";

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token }) {
      const reqData = {
        email: token.email,
        image_url: token.image,
        username: token.name,
        git_hub_id: token.sub,
      };
      const resData = await UsersService.isAuthenticatedApiUserIsAuthenticatedPost(reqData);
      token.access_token = resData.access_token;
      return token;
    },
    async session({ session, token }) {
      // save user access_token in the next auth session
      session.user.access_token = token.access_token
      return session;
    },
  },
});
