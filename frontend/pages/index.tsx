import type { NextPage } from "next";
import { CommonSection } from "../components/Sections/CommonSection";
import { HeaderSection } from "../components/Sections/HeaderSection";
import { ServiceCard } from "../components/ServiceCard/ServiceCard";
import { CaseCard } from "../components/CaseCard/CaseCard";
import { ProcessCard } from "../components/ProcessCard/ProcessCard";

import { MainLayout } from "../layouts/Main";

import { ourServices } from "../types/services";
import { ourCases } from "../types/cases";
import { processCard } from "../types/process";
import { Contacts } from "../components/Contacts/Contacts";

const Home: NextPage = () => {
  return (
    <MainLayout title="Main">
      <HeaderSection />
      <CommonSection
        title="Services"
        buttonType="outlined"
        contentOrder="row"
        background
      >
        {ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      {/* <CommonSection
        title="Cases"
        buttonType="filled"
        contentOrder="column"
        background={false}
      >
        {ourCases.map((itm) => (
          <CaseCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <CommonSection
        title="Work process"
        buttonType="outlined"
        contentOrder="row"
        background
      >
        {processCard.map((itm) => (
          <ProcessCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <Contacts /> */}
    </MainLayout>
  );
};

export default Home;
