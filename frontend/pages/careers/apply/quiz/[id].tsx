import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { QuizContainer } from "../../../../components/Career/QuizContainer";
import { Contacts } from "../../../../components/Contacts/Contacts";
import { CommonSection } from "../../../../components/Sections/CommonSection";
import { MainLayout } from "../../../../layouts/Main";
import prisma from "../../../../lib/prisma";
import { vacancies, VacancyElement } from "../../../../types/vacancies";

export interface IApplyContactsProps {
  element: VacancyElement;
  count: number;
}

const ApplyContacts: NextPage<IApplyContactsProps> = ({ element, count }) => {
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
        <QuizContainer count={count} vacancyId={element.id} />
      </CommonSection>
    </MainLayout>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = vacancies.map((itm) => {
//     return { params: { id: itm.id.toString() } };
//   });
//   return {
//     paths,
//     fallback: true, // false or 'blocking'
//   };
// };

// export const getStaticProps = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   const res = vacancies.filter((itm) => itm.id === parseInt(params!.id))[0];
//   return { props: { element: {} } };
// };

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const count = await prisma.question.count();

  let id = query.id as string;
  const element = vacancies.filter((itm) => itm.id === parseInt(id))[0];
  return {
    props: {
      element,
      count,
    },
  };
};

export default ApplyContacts;
