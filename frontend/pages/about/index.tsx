import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { AboutHeader } from "../../components/About/AboutHeader";
import { Gallery } from "../../components/About/Gallery";
import { Contacts } from "../../components/Contacts/Contacts";
import { CustomList } from "../../components/List/CustomList";
import { ProcessCardExtended } from "../../components/Process/ProcessCardExtended";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { processCard } from "../../types/process";
import { OUR_MISSION } from "../../types/services";

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
      <CommonSection
        contentOrder="row"
        title="Our Mission"
        buttonType="none"
        background
        isCaseSection
      >
        <CustomList icon="done" list={OUR_MISSION} />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="Photos"
        buttonType="none"
        isCaseSection
      >
        <Gallery />
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export default About;
