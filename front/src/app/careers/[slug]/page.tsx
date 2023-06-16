import { redirect } from "next/navigation";

import { CommonSection, Contacts, MainLayout } from "@/components";
import { VacancyContent } from "@/components/Career/VacancyContent";
import { vacancies } from "@/types/vacancies";

export interface PageParams {
  params: { slug: string };
}

const Page = ({ params }: PageParams) => {
  const slug = params.slug;
  const vacancy = vacancies.find((item) => item.slug === slug);

  if (!vacancy) {
    redirect("/careers");
  }

  return (
    <MainLayout>
      <CommonSection
        contentOrder="column"
        title={vacancy.title}
        buttonType="outlined"
        buttonText="See other careers"
        isCaseSection
        redirectTo="careers"
        fullWidth
      >
        <VacancyContent element={vacancy} />
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export default Page;
