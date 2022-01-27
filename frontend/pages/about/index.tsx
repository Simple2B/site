import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { AboutHeader } from "../../components/About/AboutHeader";
import { Contacts } from "../../components/Contacts/Contacts";
import { ProcessCardExtended } from "../../components/Process/ProcessCardExtended";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { processCard } from "../../types/process";

const About: NextPage = () => {
  const router = useRouter();

  const handleGoToCases = useCallback(() => {
    router.push("/cases");
  }, []);
  return (
    <MainLayout title="Main">
      <CommonSection
        contentOrder="row"
        title="About Us"
        buttonType="none"
        isCaseSection
      >
        <AboutHeader />
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export default About;
