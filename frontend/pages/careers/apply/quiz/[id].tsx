import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { QuizContainer } from "../../../../components/Career/QuizContainer";
import { Contacts } from "../../../../components/Contacts/Contacts";
import { CommonSection } from "../../../../components/Sections/CommonSection";
import { MainLayout } from "../../../../layouts/Main";
import prisma from "../../../../lib/prisma";
import { localStorageApi } from "../../../../services/localStorageApi";
import { quizApi } from "../../../../services/quizApi";
import { vacancies, VacancyElement } from "../../../../types/vacancies";

export interface IApplyContactsProps {
  element: VacancyElement;
  count: number;
}

const ApplyContacts: NextPage<IApplyContactsProps> = ({ element, count }) => {
  const { data: session } = useSession();
  const { push, asPath } = useRouter();
  // const {data: session} = useSession();

  console.log("session :>> ", session);

  useEffect(() => {
    if (!session) {
      push(`/auth/signin?callbackUrl=${asPath}`);
      return;
    }
  }, [session]);

  console.log("ApplyContacts: session ", session);

  if (!session) {
    return <div className="loader_container"></div>;
  }

  return (
    // <MainLayout title="Career quiz">
    <CommonSection
      contentOrder="column"
      title="Quiz"
      buttonType="none"
      isCaseSection
      fullWidth
      background
      dense
    >
      {session?.user && <QuizContainer count={count} vacancyId={element.id} />}
    </CommonSection>
    // </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const count = await prisma.question.count();
  const count = 4
  const session = await getSession(context);

  let id = context.query.id as string;
  const element = vacancies.filter((itm) => itm.id === parseInt(id))[0];
  return {
    props: {
      element,
      count,
      session,
    },
  };
};

export default ApplyContacts;
