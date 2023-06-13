"use client"
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import { CaseCard } from '../../components/CaseCard/CaseCard';
import { CaseFilters } from '../../components/CaseCard/CaseFilters';
import { Contacts } from '../../components/Contacts/Contacts';
import { CommonSection } from '../../components/Sections/CommonSection';
import { MainLayout } from '@/components';
import { ICaseCard, ourCases } from '../../types/cases';

export interface IcasesProps { }

const Cases: NextPage = () => {
  const [filters, setFilters] = useState<string[]>(['Show All']);

  const handleToggleFilter = (filter: string, isActive?: boolean) => {
    setFilters([filter]);
  };

  const filterProjects = useCallback((itm: ICaseCard) => {
    return itm.tags.filter((caseFilter) => filters.includes(caseFilter)).length > 0;
  }, [filters]);

  const cases = useMemo(() => {
    if (filters.indexOf('Show All') >= 0)
      return ourCases.map((itm) => (
        <Link key={itm.id} href={`/cases/${itm.id}`}>
          <CaseCard card={itm} />
        </Link>
      ));
    return ourCases.filter(filterProjects).map((itm) => (
      <Link key={itm.id} href={`/cases/${itm.id}`}>
        <CaseCard card={itm} />
      </Link>
    ));
  }, [filterProjects, filters]);

  return (
    <MainLayout title='Cases'>
      <CommonSection contentOrder='column' title='Our cases' buttonType='none' isCaseSection>
        <CaseFilters filters={filters} handleToggleFilter={handleToggleFilter} />
        {cases.length > 0 ? cases : <h2>Please, choose another filter!</h2>}
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export default Cases;
