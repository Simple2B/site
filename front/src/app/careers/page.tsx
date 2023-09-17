import { vacancies } from "@/types/vacancies";
import { CommonSection, Contacts, MainLayout } from "@/components";
import { CareerContent } from "@/components/Career/CareerContent";

export const metadata = {
  title: "Careers",
};

const Page = () => {
  return (
    <MainLayout>
      <CommonSection
        contentOrder="column"
        title="Careers"
        buttonType="outlined"
        buttonText="See Our Cases"
        redirectTo="cases"
        isCaseSection
        fullWidth
      >
        <CareerContent list={vacancies} />
      </CommonSection>
      {/* <Contacts background /> */}
    </MainLayout>
  );
};

export default Page;
