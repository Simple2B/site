import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import prisma from '@/lib/prisma';

import { CommonSection, MainLayout } from '@/components';
import { CareerForm } from '@/components/Career/CareerForm';
import { VacancyElement, vacancies } from '@/types/vacancies';


export interface IApplyContactsProps {
  element: VacancyElement;
  errorCode: number | null;
  userId: number;
}

const ApplyContacts: NextPage<IApplyContactsProps> = ({ element, errorCode, userId }) => {
  if (errorCode) {
    return <div>Error - {errorCode}</div>;
  }
  return (
    <MainLayout title='Careers'>
      <CommonSection
        contentOrder='column'
        title={element ? element.title : 'Title'}
        buttonType='none'
        isCaseSection
        background
      >
        <CareerForm vacancy={element} userId={userId} />
      </CommonSection>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  let errorCode = !element ? 404 : null;
  if (!element) {
    context.res.statusCode = errorCode ? errorCode : 200;
  }
  return {
    props: {
      errorCode,
      element: element ? element : null,
      userId,
    },
  };
};

export default ApplyContacts;
