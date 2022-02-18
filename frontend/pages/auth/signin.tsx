import { GetServerSideProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
  SignInOptions,
} from "next-auth/react";
import { Navbar } from "../../components/Navbar/Navbar";
import { SignInContent } from "../../components/SignIn/SignInContent";


// interface ISignInProps {
//   providers: Record<
//     LiteralUnion<BuiltInProviderType, string>,
//     ClientSafeProvider
//   > | null;
// }

// const SignIn: NextPage<ISignInProps> = ({ providers }) => {
//   const customAuth = () => {
//     if (providers) {
//       return Object.values(providers).map((provider) => (
//         <div key={provider.name}>
//           <button onClick={() => signIn(provider.id)}>
//             Sign in with {provider.name}
//           </button>
//         </div>
//       ));
//     }
//   };
//   return <>{customAuth()}</>;
// };

const SignIn: NextPage = () => {
  return (
    <><Navbar />
    <SignInContent />
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
// export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session = await getSession({ req: context.req });
  // if (session?.user) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  // const providers = await getProviders();
  // return {
  //   props: { providers },
  // };
//   const { req, res, query } = context;
//   const session = await getSession({ req: context.req });

//   const callbackUrl = query.callbackUrl as string;

//   if (session?.user) {
//     return {
//       redirect: {
//         destination: callbackUrl,
//         permanent: false,
//       },
//     };
//   }

//   const providers = await getProviders();

//   return {
//     props: { providers },
//   };
// };

export default SignIn;
