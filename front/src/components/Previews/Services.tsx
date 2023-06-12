import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MainLayout } from "../layouts/Main";
import { CommonSection } from "../Sections/CommonSection";
import { ServiceHeader } from "../Services/ServiceHeader";
import { CustomList } from "../List/CustomList";
import { Accordion } from "../Accordion/Accordion";
import { Contacts } from "../Contacts/Contacts";
import { WHAT_WE_DO } from "@/types/services";

const Services = () => {
  const router = useRouter();

  const handleGoToCases = useCallback(() => {
    router.push("/cases");
  }, []);
  return (
    <MainLayout title="Services">
      <CommonSection
        contentOrder="column"
        title="Services"
        buttonType="none"
        isCaseSection
        fullWidth
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
      <Contacts background />
    </MainLayout>
  );
};

export default Services;
