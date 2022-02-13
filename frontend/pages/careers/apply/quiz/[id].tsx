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
  session: Session | null;
  userId?: number;
}

const ApplyContacts: NextPage<IApplyContactsProps> = ({
  element,
  count,
  session,
  userId,
}) => {
  const router = useRouter();

  console.log("session :>> ", session);

  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }
  }, [session]);

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
      {userId && (
        <QuizContainer count={count} vacancyId={element.id} userId={userId} />
      )}
    </CommonSection>
    // </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const count = await prisma.question.count();
  const session = await getSession(context);
  let users;
  if (session) {
    users = await prisma.user.findMany({
      where: {
        email: `${session?.user?.email}`,
      },
    });
  }
  const userId = users ? users[0].id : null;
  let id = context.query.id as string;
  const element = vacancies.filter((itm) => itm.id === parseInt(id))[0];
  return {
    props: {
      element,
      count,
      session,
      userId: userId,
    },
  };
};

export default ApplyContacts;
