import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { CareerContent } from "../../components/Career/CareerContent";
import { Contacts } from "../../components/Contacts/Contacts";
import { CommonSection } from "../../components/Sections/CommonSection";

import { MainLayout } from "../../layouts/Main";
import { vacancies, VacancyElement } from "../../types/vacancies";
import { VacancyOut, VacancyService } from "../api/backend";

export interface ICareersProps {
  list: VacancyOut[];
}

const Careers: NextPage<ICareersProps> = ({ list }) => {
  const router = useRouter();
  const handleAllCasesClick = useCallback(() => {
    router.push("/cases");
  }, []);
  return (
    <MainLayout title="Careers">
      <CommonSection
        contentOrder="column"
        title="Careers"
        buttonType="outlined"
        buttonText="See Our Cases"
        isCaseSection
        fullWidth
        btnCallback={handleAllCasesClick}
      >
        <CareerContent list={list} />
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export async function getServerSideProps() {
  const res = await VacancyService.getVacanciesVacanciesGet();
  return { props: { list: res } };
}

// export async function getStaticProps() {
//   return { props: { list: vacancies } };
// }

export default Careers;
