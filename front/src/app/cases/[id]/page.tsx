"use client"

import { useRouter } from 'next/navigation';

import { CommonSection, Contacts, MainLayout } from '@/components';
import { ICaseCard, ourCases } from '@/types/cases';
import { CaseHeader } from '@/components/CasePage/CaseHeader';
import { CaseGallery } from '@/components/CasePage/CaseGallery';


export interface PageParams {
  params: { id: string };
}

const Case = ({ params }: PageParams) => {
  console.log(params);
  const router = useRouter();

  const caseId = params.id;
  const card = ourCases.find((item) => item.id === Number(caseId))!;
  console.log(card);

  const handleAllCasesClick = () => {
    router.push('/cases');
  };

  return (
    <MainLayout title='Cases'>
      <CommonSection
        contentOrder='column'
        title={card.title}
        subtitle={card.subtitle}
        buttonType='filled'
        buttonText='See other cases'
        isCaseSection
        btnCallback={handleAllCasesClick}
      >
        <CaseHeader caseCard={card} />
        <CaseGallery caseCard={card} />
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export default Case;
