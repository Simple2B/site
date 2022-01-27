import { NextPage } from "next";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { Contacts } from "../../components/Contacts/Contacts";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { ServiceHeader } from "../../components/Services/ServiceHeader";
import { WhatWeDo } from "../../components/Services/WhatWeDo";
import { Accordion } from "../../components/Accordion/Accordion";
import { useRouter } from "next/router";

const Services: NextPage = () => {
  const router = useRouter();

  const handleGoToCases = useCallback(() => {
    router.push("/cases");
  }, []);
  return (
    <MainLayout title="Main">
      <CommonSection
        contentOrder="column"
        title="Services"
        buttonType="none"
        isCaseSection
      >
        <ServiceHeader />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="What we do"
        buttonType="none"
        isCaseSection
        background
      >
        <WhatWeDo />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="Featured Technologies"
        buttonType="outlined"
        buttonText="See our cases"
        btnCallback={handleGoToCases}
        isCaseSection
      >
        <Accordion />
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export default Services;
