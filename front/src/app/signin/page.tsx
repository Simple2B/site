import { CommonSection, SignInContent } from "@/components";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  return (
    <CommonSection
      isCaseSection
      isSignInSection
      title="Junior Full-stack Developer"
      buttonType="none"
      contentOrder="row"
      dense
    >
      <SignInContent />
    </CommonSection>
  );
};

export default page;
