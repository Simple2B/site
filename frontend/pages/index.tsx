import type { NextPage } from "next";
import { CommonSection } from "../components/Sections/CommonSection";
import { HeaderSection } from "../components/Sections/HeaderSection";
import { ServiceCard } from "../components/Services/ServiceCard";
import { CaseCard } from "../components/CaseCard/CaseCard";
import { ProcessCard } from "../components/ProcessCard/ProcessCard";

import { MainLayout } from "../layouts/Main";

import { ourServices } from "../types/services";
import { ourCases } from "../types/cases";
import { processCard } from "../types/process";
import { Contacts } from "../components/Contacts/Contacts";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Link from "next/link";

const Home: NextPage = () => {
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
        buttonType="outlined"
        contentOrder="row"
        background
        btnCallback={handleServicesClick}
      >
        {ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
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
              <a>
                <CaseCard card={itm} />
              </a>
            </Link>
          ))}
      </CommonSection>
      <CommonSection
        title="Work process"
        buttonType="outlined"
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
