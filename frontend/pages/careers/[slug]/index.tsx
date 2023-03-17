import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { VacancyContent } from "../../../components/Career/VacancyContent";
import { Contacts } from "../../../components/Contacts/Contacts";
import { CommonSection } from "../../../components/Sections/CommonSection";
import { MainLayout } from "../../../layouts/Main";
import { VacancyOut, VacancyService } from "../../api/backend";

export interface VacancyPageProps {
  element: VacancyOut;
}

const Vacancy = ({ element }: VacancyPageProps) => {
  const router = useRouter();

  const handleAllCasesClick = () => {
    router.push("/careers");
  };

  return (
    <MainLayout title="Careers">
      <CommonSection
        contentOrder="column"
        title={element ? element.title : "Title"}
        buttonType="outlined"
        buttonText="See other careers"
        isCaseSection
        btnCallback={handleAllCasesClick}
        fullWidth
      >
        <VacancyContent element={element} />
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

// export async function getStaticPaths() {
//   const paths = vacancies.map((itm) => {
//     return { params: { id: itm.id.toString() } };
//   });
//   return {
//     paths,
//     fallback: true, // false or 'blocking'
//   };
// }

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const res = vacancies.filter((itm) => itm.id === parseInt(params.id))[0];
//   return { props: { element: res } };
// }

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    const element = await VacancyService.getVacancyBySlugApiVacanciesSlugGet(
      slug as string
    );
    return {
      props: {
        element,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Vacancy;
