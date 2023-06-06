import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { CaseGallery } from '../../components/CasePage/CaseGallery';
import { CaseHeader } from '../../components/CasePage/CaseHeader';
import { Contacts } from '../../components/Contacts/Contacts';
import { CommonSection } from '../../components/Sections/CommonSection';
import { MainLayout } from '../../layouts/Main';
import { ICaseCard, ourCases } from '../../types/cases';
import { InferGetServerSidePropsType } from 'next';
import InferNextPropsType from 'infer-next-props-type';

export interface CasePageProps {
  allCases: ICaseCard[];
}

const Case = (props: CasePageProps) => {
  const router = useRouter();
  const { id } = router.query;
  const caseId = id as string;
  const card = props.allCases.filter((itm) => itm.id.toString() === caseId)[0];

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

// This gets called on every request
export function getServerSideProps() {
  return {
    props: {
      allCases: ourCases,
    },
  };
}

export default Case;
