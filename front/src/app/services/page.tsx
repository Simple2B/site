import {
  Accordion,
  CommonSection,
  Contacts,
  CustomList,
  MainLayout,
  ServiceHeader,
} from "@/components";
import { WHAT_WE_DO } from "@/types/services";

const Page = () => {
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
        redirectTo="cases"
        isCaseSection
      >
        <Accordion />
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export default Page;
