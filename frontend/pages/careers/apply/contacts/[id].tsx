import { NextPage } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { CareerContent } from "../../../../components/Career/CareerContent";
import { CareerForm } from "../../../../components/Career/CareerForm";
import { Contacts } from "../../../../components/Contacts/Contacts";
import { CommonSection } from "../../../../components/Sections/CommonSection";
import { MainLayout } from "../../../../layouts/Main";
import { vacancies, VacancyElement } from "../../../../types/vacancies";

export interface IApplyContactsProps {
  element: VacancyElement;
}

const ApplyContacts: NextPage<IApplyContactsProps> = ({ element }) => {
  return (
    <MainLayout title="Careers">
      <CommonSection
        contentOrder="column"
        title={element.title}
        buttonType="none"
        isCaseSection
        background
      >
        <CareerForm isDeveloper={element.isDeveloper}/>
      </CommonSection>
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
export default ApplyContacts;
