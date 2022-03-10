import { NextPage } from "next";
import { CommonSection } from "../../components/Sections/CommonSection";
import { SignInContent } from "../../components/SignIn/SignInContent";
import { MainLayout } from "../../layouts/Main";

const SignIn: NextPage = () => {
  return (
    <MainLayout title="Main">
      <CommonSection
        isCaseSection
        isSignInSection
        title="Junior Full-stack Developer"
        buttonType="none"
        contentOrder="row"
      >
        <SignInContent />
      </CommonSection>
    </MainLayout>
  );
};

export default SignIn;
