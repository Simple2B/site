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
    async signIn({ user }) {
      // save user data to db
      // we use github id here as user password
      const userData = {
        email: user.email,
        image_url: user.image,
        username: user.name,
        password: user.id,
      };
      try {

        const newUser = await UsersService.createUserUserCreateUserPost(userData);
        console.log("createUser: newUser => ", newUser);
      } catch (error) {
        return '/auth/signin'
      }
      return true;
    },
    async jwt({ token, }) {
      // login user to get access_token during generation next auth jwt token
      const reqData = { username: token.email, password:  token.sub}
      const resData = await AuthenticationService.loginLoginPost(reqData);
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
