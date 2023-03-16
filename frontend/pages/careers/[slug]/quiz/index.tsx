import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { CareerForm } from "../../../../components/Career/CareerForm";
import { QuizContainer } from "../../../../components/Career/QuizContainer";
import { Contacts } from "../../../../components/Contacts/Contacts";
import { CommonSection } from "../../../../components/Sections/CommonSection";
import { MainLayout } from "../../../../layouts/Main";
import prisma from "../../../../lib/prisma";
import { localStorageApi } from "../../../../services/localStorageApi";
import { quizApi } from "../../../../services/quizApi";
import { vacancies, VacancyElement } from "../../../../types/vacancies";
import {
  OpenAPI,
  QuestionOut,
  UserAnswer,
  VacancyService,
} from "../../../api/backend";

export interface IApplyContactsProps {
  questions_ids: number[];
  slug: string;
}

const ApplyContacts: NextPage<IApplyContactsProps> = ({
  questions_ids,
  slug,
}) => {
  const { data: session, status } = useSession();
  const { push, asPath } = useRouter();
  const [userAnswer, SetUserAnswer] = useState<UserAnswer[]>([]);

  // console.log("session :>> ", session);

  // useEffect(() => {
  //   if (!session) {
  //     push(`/auth/signin?callbackUrl=${asPath}`);
  //     return;
  //   }
  // }, [session]);

  const addUserAnswer = (answer: UserAnswer) => {
    SetUserAnswer([...userAnswer, answer]);
  };

  console.log(userAnswer, "userAnswer");

  // OpenAPI.TOKEN = session.data?.user.access_token

  //   try {
  //     const setAnswer  = await UsersService.setUserAnswerUserSetAnswerPost(result)
  //   } catch (error) {
  //     console.error(error)
  //   }

  // console.log("ApplyContacts: session ", session);

  if (status === "loading") {
    return <div className="loader_container"></div>;
  }
  if (userAnswer.length === questions_ids.length) {
    return (
      <MainLayout title="Careers">
        <CommonSection
          contentOrder="column"
          buttonType="none"
          isCaseSection
          background
        >
          <CareerForm vacancy userId answers={userAnswer} />
        </CommonSection>
      </MainLayout>
    );
  }
  return (
    <CommonSection
      contentOrder="column"
      title="Quiz"
      buttonType="none"
      isCaseSection
      fullWidth
      background
      dense
    >
      {session?.user && (
        <QuizContainer
          questions={questions_ids}
          vacancySlug={slug}
          callBackAddAnswer={addUserAnswer}
        />
      )}
    </CommonSection>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { slug } = context.query;
  const access_token = session?.user?.access_token;

  if (!slug || !access_token) return { notFound: true };

  OpenAPI.TOKEN = access_token;

  try {
    let questions =
      await VacancyService.getVacancyQuestionsVacanciesSlugQuestionsGet(
        slug as string
      );
    questions.sort((a, b) => 0.5 - Math.random());
    console.log(questions);
    return {
      props: {
        questions_ids: questions,
        slug: slug,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ApplyContacts;
