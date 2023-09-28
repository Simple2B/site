import { vacancies } from '@/types/vacancies';
import { CommonSection, MainLayout } from '@/components';
import { CareerContent } from '@/components/Career/CareerContent';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Careers',
};

const Page = () => {
  const cookieStore = cookies();
  const lang = cookieStore.get('n18i')?.value ?? 'en';

  if (lang === 'de') {
    return notFound();
  }

  return (
    <MainLayout>
      <CommonSection
        contentOrder="column"
        title="Careers"
        buttonType="outlined"
        buttonText="See Our Cases"
        redirectTo="cases"
        isCaseSection
        fullWidth
      >
        <CareerContent list={vacancies} />
      </CommonSection>
    </MainLayout>
  );
};

export default Page;
