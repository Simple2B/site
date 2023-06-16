import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  // callbacks: {
  //   async signIn(...props) {
  //     // console.log("props => ", props);
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     // console.log("url", url);
  //     // console.log("baseUrl", baseUrl);
  //     return baseUrl;
  //   },
  //   async session({ session, user, token }) {
  //     return session;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token;
  //   },
  // },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
});
