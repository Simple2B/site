import { NextPage } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { CaseCard } from "../../components/CaseCard/CaseCard";
import { CaseFilters } from "../../components/CaseCard/CaseFilters";
import { Contacts } from "../../components/Contacts/Contacts";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { ICaseCard, ourCases } from "../../types/cases";

export interface IcasesProps {}

const Cases: NextPage = () => {
  const [filters, setFilters] = useState<string[]>(["Show All"]);

  const handleToggleFilter = (filter: string, isActive?: boolean) => {
    setFilters([filter]);
  };

  const filterProjects = (itm: ICaseCard) => {
    return (
      itm.tags.filter((caseFilter) => filters.includes(caseFilter)).length > 0
    );
  };

  const cases = useMemo(() => {
    if (filters.indexOf("Show All") >= 0)
      return ourCases.map((itm) => (
        <Link key={itm.id} href={`/cases/${itm.id}`}>
          <a>
            <CaseCard card={itm} />
          </a>
        </Link>
      ));
    return ourCases
      .filter(filterProjects)
      .map((itm) => <CaseCard key={itm.id} card={itm} />);
  }, [filters]);

  return (
    <MainLayout title="Main">
      <CommonSection
        contentOrder="column"
        title="Our cases"
        buttonType="none"
        isCaseSection
        background
      >
        <CaseFilters
          filters={filters}
          handleToggleFilter={handleToggleFilter}
        />
        {cases}
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export default Cases;
