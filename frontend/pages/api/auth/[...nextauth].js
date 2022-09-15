import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "../../../lib/prisma";
import { clientApi } from "../backend/userInstance";

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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // save user data to db
      const userData = {
        email: user.email,
        image_url: user.image,
        username: user.name,
        password: user.email.split("@")[0],
      };

      console.log("signIn: userData ", userData);

      const newUser = await clientApi.createUser(userData);
      console.log("createUser: newUser => ", newUser);

      // create customer in stripe
      // let stripeCustomer;
      // if (newUser.subscription_info === null) {
      //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});
      //     const customer = await stripe.customers.create({
      //         description: user.name,
      //         email: user.email,
      //     });
      //     // formed data from stripe customer to save to db
      //     const data = {
      //         email: user.email,
      //         stripe_customer: customer.id,
      //     };
      //     stripeCustomer = await stripeApi.createStripeCustomer(data);
      //     console.log("createUser: stripeCustomer => " , stripeCustomer);
      // };

      // TODO: create API call to get the token
      user.acessToken = "FAKE-TOKEN";
      // user.profile = newUser
      // user.subscription = stripeCustomer
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.acessToken = user.acessToken;
        // token.profile = user.profile
        // token.subscription = user.subscription
      }
      return token;
    },
    async session({ session, token }) {
      session.acessToken = token.acessToken;
      // session.profile = token.profile
      // session.subscription = token.subscription
      return session;
    },
  },
});
