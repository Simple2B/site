"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { processCard } from "@/types/process";
import {
  CommonSection,
  Contacts,
  MainLayout,
  ProcessCardExtended,
} from "@/components";

const Process = () => {
  const router = useRouter();

  const handleGoToCases = useCallback(() => {
    router.push("/cases");
  }, [router]);

  return (
    <MainLayout title="Process">
      <CommonSection
        contentOrder="column"
        title="Work Process"
        buttonType="filled"
        buttonText="See Our Cases"
        btnCallback={handleGoToCases}
        isCaseSection
      >
        {processCard.map((itm) => (
          <ProcessCardExtended key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export default Process;
