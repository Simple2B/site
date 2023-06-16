"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import prisma from "@/lib/prisma";

import { CommonSection } from "@/components";
import { QuizContainer } from "@/components/Career/QuizContainer";
import { VacancyElement, vacancies } from "@/types/vacancies";

export interface IApplyContactsProps {
  element: VacancyElement;
  count: number;
  session: Session | null;
  userId?: number;
}

const ApplyContacts = ({ element, count, session, userId }: IApplyContactsProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }
  }, [router, session]);

  if (!session) {
    return <div className='loader_container'></div>;
  }
  return (
    // <MainLayout title="Career quiz">
    <CommonSection
      contentOrder='column'
      title='Quiz'
      buttonType='none'
      isCaseSection
      fullWidth
      background
      dense
    >
      {!!userId ? <QuizContainer count={count} vacancyId={element.id} userId={userId} /> : <></>}
    </CommonSection>
    // </MainLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const count = await prisma.question.count();
//   const session = await getSession(context);
//   let users;
//   if (session) {
//     users = await prisma.user.findMany({
//       where: {
//         email: `${session?.user?.email}`,
//       },
//     });
//   }
//   const userId = users ? users[0].id : null;
//   let id = context.query.id as string;
//   const element = vacancies.filter((itm) => itm.id === parseInt(id))[0];
//   return {
//     props: {
//       element,
//       count,
//       session,
//       userId: userId,
//     },
//   };
// };

export default ApplyContacts;
