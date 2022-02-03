import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { QuizContainer } from "../../../../components/Career/QuizContainer";
import { Contacts } from "../../../../components/Contacts/Contacts";
import { CommonSection } from "../../../../components/Sections/CommonSection";
import { MainLayout } from "../../../../layouts/Main";
import { vacancies, VacancyElement } from "../../../../types/vacancies";

export interface IApplyContactsProps {
  element: VacancyElement;
}

const ApplyContacts: NextPage<IApplyContactsProps> = ({ element }) => {
  return (
    <MainLayout title="Career quiz">
      <CommonSection
        contentOrder="column"
        title="Quiz"
        buttonType="none"
        isCaseSection
        fullWidth
        background
        dense
      >
        <QuizContainer />
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
