import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github';

const GITHUB_ID = process.env.GITHUB_ID || ""
const GITHUB_SECRET = process.env.GITHUB || ""

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
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
//   adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
})

export { handler as GET, handler as POST }