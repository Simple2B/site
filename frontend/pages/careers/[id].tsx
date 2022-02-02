import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { CaseGallery } from "../../components/CasePage/CaseGallery";
import { CaseHeader } from "../../components/CasePage/CaseHeader";
import { Contacts } from "../../components/Contacts/Contacts";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { ICaseCard, ourCases } from "../../types/cases";
import { InferGetServerSidePropsType } from "next";
import InferNextPropsType from "infer-next-props-type";
import { vacancies, VacancyElement } from "../../types/vacancies";
import { VacancyContent } from "../../components/Career/VacancyContent";

export interface VacancyPageProps {
  element: VacancyElement;
}

const Vacancy = ({ element }: VacancyPageProps) => {
  const router = useRouter();

  const handleAllCasesClick = () => {
    router.push("/cases");
  };

  return (
    <MainLayout title="Main">
      <CommonSection
        contentOrder="column"
        title={element.title}
        buttonType="filled"
        buttonText="See other cases"
        isCaseSection
        background
        btnCallback={handleAllCasesClick}
        fullWidth
      >
        <VacancyContent element={element} />
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export async function getStaticPaths() {
  const paths = vacancies.map((itm) => {
    return { params: { id: itm.id.toString() } };
  });
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = vacancies.filter((itm) => itm.id === parseInt(params.id))[0];
  return { props: { element: res } };
}

export default Vacancy;
