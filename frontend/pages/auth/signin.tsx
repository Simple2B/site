import { GetServerSideProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  LiteralUnion,
  ClientSafeProvider,
  getProviders,
} from "next-auth/react";
import { CommonSection } from "../../components/Sections/CommonSection";
import { SignInContent } from "../../components/SignIn/SignInContent";
import { MainLayout } from "../../layouts/Main";

export interface ISignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const SignIn: NextPage<ISignInProps> = ({ providers }) => {
  // console.log("providers :>> ", providers);
  return (
    <MainLayout title="SignIn">
      <CommonSection
        isCaseSection
        isSignInSection
        title="Junior Full-stack Developer"
        buttonType="none"
        contentOrder="row"
        dense
      >
        <SignInContent providers={providers} />
      </CommonSection>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
