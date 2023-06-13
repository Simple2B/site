// import { useRouter } from "next/router";
"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { Contacts } from "@/components/Contacts/Contacts";
import { CommonSection } from "@/components/Sections/CommonSection";
import { ServiceHeader } from "@/components/Services/ServiceHeader";
import { Accordion } from "@/components/Accordion/Accordion";
import { CustomList } from "@/components/List/CustomList";

import { WHAT_WE_DO, ourServices } from "@/types/services";
import { HeaderSection } from "@/components/Sections/HeaderSection";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { useRouter } from "next/navigation";
import { processCard } from "@/types/process";
import { ourCases } from "@/types/cases";
import { CaseCard } from "@/components/CaseCard/CaseCard";
import { ProcessCard } from "@/components/Process/ProcessCardMain";
import { MainLayout } from "@/components";

const Home = () => {
  const router = useRouter();

  const handleServicesClick = useCallback(() => {
    router.push("/services");
  }, []);
  const handleAllCasesClick = useCallback(() => {
    router.push("/cases");
  }, []);
  const handleProcessClick = useCallback(() => {
    router.push("/process");
  }, []);

  return (
    <MainLayout title="Main">
      <HeaderSection />
      <CommonSection
        title="Services"
        buttonType="outlinedWithBackground"
        contentOrder="row"
        background
        btnCallback={handleServicesClick}
        fullWidth
      >
        <>
          {ourServices.map((itm) => (
            <ServiceCard key={itm.id} card={itm} />
          ))}
        </>
      </CommonSection>
      <CommonSection
        title="Cases"
        buttonType="filled"
        contentOrder="column"
        background={false}
        buttonText="See more"
        btnCallback={handleAllCasesClick}
      >
        {ourCases
          .filter((itm) => itm.isMain)
          .map((itm) => (
            <Link key={itm.id} href={`/cases/${itm.id}`}>
              <CaseCard card={itm} />
            </Link>
          ))}
      </CommonSection>
      <CommonSection
        title="Work process"
        buttonType="outlinedWithBackground"
        contentOrder="row"
        background
        buttonText="See more"
        btnCallback={handleProcessClick}
      >
        {processCard.map((itm) => (
          <ProcessCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export default Home;
