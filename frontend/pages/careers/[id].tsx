import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
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
import { useSession, signIn, signOut } from "next-auth/react";
import { localStorageApi } from "../../services/localStorageApi";
import { CustomButton } from "../../components/Buttons/CustomButton";

export interface VacancyPageProps {
  element: VacancyElement;
}

const Vacancy = ({ element }: VacancyPageProps) => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (!localStorageApi.getUserData()) localStorageApi.createUserData();
  }, []);

  const handleAllCasesClick = () => {
    router.push("/careers");
  };

  const handleApplyFor = () => {
    if (session.status === "loading") return;
    if (session.status === "authenticated") {
      // TODO push to quiz
      router.push("/careers");
      return;
    }
    signIn();
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
        {/* TODO Review it during the implementing 'quiz' */}
        <CustomButton title="Apply for" onClick={handleApplyFor} size="small" />
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
  let id = query.id as string;
  const element = vacancies.filter((itm) => itm.id === parseInt(id))[0];
  return {
    props: {
      element,
    },
  };
};

export default Vacancy;
