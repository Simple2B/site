import { NextPage } from "next";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { Contacts } from "../../components/Contacts/Contacts";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { ServiceHeader } from "../../components/Services/ServiceHeader";
import { Accordion } from "../../components/Accordion/Accordion";
import { useRouter } from "next/router";
import { CustomList } from "../../components/List/CustomList";
import { WHAT_WE_DO } from "../../types/services";

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
        <CustomList icon="pin" list={WHAT_WE_DO} />
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
