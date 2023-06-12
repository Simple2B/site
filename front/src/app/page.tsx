// import { useRouter } from "next/router";
"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { Contacts } from "@/components/Contacts/Contacts";
import { CommonSection } from "@/components/Sections/CommonSection";
import { ServiceHeader } from "@/components/Services/ServiceHeader";
import { Accordion } from "@/components/Accordion/Accordion";
import { CustomList } from "@/components/List/CustomList";

import { MainLayout } from "@/components/layouts/Main";
import { WHAT_WE_DO, ourServices } from "@/types/services";
import { HeaderSection } from "@/components/Sections/HeaderSection";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { useRouter } from "next/navigation";

const Home = () => {
  // const router = useRouter();

  // const handleGoToCases = useCallback(() => {
  //   router.push("/cases");
  // }, []);

  const router = useRouter();

  const handleServicesClick = useCallback(() => {
    router.push("/services");
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
      <Contacts background />

      {/* <CommonSection
        contentOrder="column"
        title="What we do"
        buttonType="none"
        isCaseSection
        background
      >
        <CustomList icon="pin" list={WHAT_WE_DO} />
      </CommonSection> */}
      {/* <CommonSection
        contentOrder="column"
        title="Featured Technologies"
        buttonType="outlined"
        buttonText="See our cases"
        // btnCallback={handleGoToCases}
        isCaseSection
      >
        <Accordion />
      </CommonSection> */}
    </MainLayout>
  );
};

export default Home;
