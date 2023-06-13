import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { CommonSection, Contacts, MainLayout } from '@/components';
import { VacancyContent } from '@/components/Career/VacancyContent';
import { localStorageApi } from '@/services/localStorageApi';
import { VacancyElement, vacancies } from '@/types/vacancies';



export interface VacancyPageProps {
  element: VacancyElement;
  params: { id: string };
}

const Vacancy = ({ element }: VacancyPageProps) => {
  const router = useRouter();

  const handleAllCasesClick = () => {
    router.push('/careers');
  };

  useEffect(() => {
    if (!localStorageApi.getUserData()) localStorageApi.createUserData();
  }, []);

  return (
    <MainLayout title='Careers'>
      <CommonSection
        contentOrder='column'
        title={element ? element.title : 'Title'}
        buttonType='outlined'
        buttonText='See other careers'
        isCaseSection
        btnCallback={handleAllCasesClick}
        fullWidth
      >
        <VacancyContent element={element} />
        {/* TODO Review it during the implementing 'quiz' */}
        {/* <button
          onClick={() => {
            signOut();
            localStorageApi.clearUserData();
          }}
        >
          SignOut
        </button> */}
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

// export async function getStaticPaths() {
//   const paths = vacancies.map((itm) => {
//     return { params: { id: itm.id.toString() } };
//   });
//   return {
//     paths,
//     fallback: true, // false or 'blocking'
//   };
// }

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const res = vacancies.filter((itm) => itm.id === parseInt(params.id))[0];
//   return { props: { element: res } };
// }

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let id = query.id as string;
  const element = vacancies.filter((itm) => itm.id === parseInt(id))[0];
  return {
    props: {
      element,
    },
  };
};

export default Vacancy;
