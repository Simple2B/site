
"use client"

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { VacancyElement, vacancies } from '@/types/vacancies';
import { CommonSection, Contacts, MainLayout } from '@/components';
import { CareerContent } from '@/components/Career/CareerContent';

export interface ICareersProps {
  list: VacancyElement[];
}

const Careers = () => {
  const router = useRouter();
  const handleAllCasesClick = useCallback(() => {
    router.push('/cases');
  }, [router]);

  return (
    <MainLayout title='Careers'>
      <CommonSection
        contentOrder='column'
        title='Careers'
        buttonType='outlined'
        buttonText='See Our Cases'
        isCaseSection
        fullWidth
        btnCallback={handleAllCasesClick}
      >
        <CareerContent list={vacancies} />
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

// export async function getStaticProps() {
//   return { props: { list: vacancies } };
// }

export default Careers;
