import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Contacts } from "../../components/Contacts/Contacts";
import { ProcessCardExtended } from "../../components/Process/ProcessCardExtended";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { processCard } from "../../types/process";

const Process: NextPage = () => {
  const router = useRouter();

  const handleGoToCases = useCallback(() => {
    router.push("/cases");
  }, []);
  return (
    <MainLayout title="Main">
      <CommonSection
        contentOrder="column"
        title="Work Process"
        buttonType="filled"
        buttonText="See Our Cases"
        btnCallback={handleGoToCases}
        isCaseSection
        background
      >
        {processCard.map((itm) => (
          <ProcessCardExtended key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export default Process;
