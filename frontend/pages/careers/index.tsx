import { NextPage } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { CareerContent } from "../../components/Career/CareerContent";
import { Contacts } from "../../components/Contacts/Contacts";
import { CommonSection } from "../../components/Sections/CommonSection";

import { MainLayout } from "../../layouts/Main";
import { vacancies, VacancyElement } from "../../types/vacancies";

export interface ICareersProps {
  list: VacancyElement[];
}

const Careers: NextPage<ICareersProps> = ({ list }) => {
  return (
    <MainLayout title="Careers">
      <CommonSection
        contentOrder="column"
        title="Careers"
        buttonType="outlined"
        buttonText="See Our Cases"
        isCaseSection
        fullWidth
      >
        <CareerContent list={list} />
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return { props: { list: vacancies } };
}

export default Careers;
