import { GetServerSideProps, NextPage } from "next";
import { useSession, getSession } from "next-auth/react";
import React, { useState } from "react";
import { CareerForm } from "../../../../components/Career/CareerForm";
import { QuizContainer } from "../../../../components/Career/QuizContainer";
import { CommonSection } from "../../../../components/Sections/CommonSection";
import { MainLayout } from "../../../../layouts/Main";
import {
  OpenAPI,
  UserAnswer,
  QuestionsService,
  VacancyType,
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
  const [userAnswer, SetUserAnswer] = useState<UserAnswer[]>([]);

  const addUserAnswer = (answer: UserAnswer) => {
    SetUserAnswer([...userAnswer, answer]);
  };

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
          <CareerForm answers={userAnswer} />
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
      await QuestionsService.getQuestionsApiQuestionsTypeVacancyGet(
        VacancyType.DEVELOPER
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
