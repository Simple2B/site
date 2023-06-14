import { ourServices } from "@/types/services";
import { processCard } from "@/types/process";
import { ourCases } from "@/types/cases";
import {
  CaseCard,
  CommonSection,
  Contacts,
  HeaderSection,
  MainLayout,
  ProcessCard,
  ServiceCard,
} from "@/components";

const Home = () => {
  return (
    <MainLayout title="Main">
      <HeaderSection />
      <CommonSection
        title="Services"
        buttonType="outlinedWithBackground"
        contentOrder="row"
        background
        redirectTo="services"
        fullWidth
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
        redirectTo="cases"
      >
        {ourCases
          .filter((itm) => itm.isMain)
          .map((itm) => (
            <CaseCard key={itm.id} card={itm} />
          ))}
      </CommonSection>
      <CommonSection
        title="Work process"
        buttonType="outlinedWithBackground"
        contentOrder="row"
        background
        buttonText="See more"
        redirectTo="process"
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
