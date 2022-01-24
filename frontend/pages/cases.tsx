import { NextPage } from "next";
import React from "react";
import { CaseFilters } from "../components/CaseCard/CaseFilters";
import { Contacts } from "../components/Contacts/Contacts";
import { CommonSection } from "../components/Sections/CommonSection";
import { MainLayout } from "../layouts/Main";

export interface IcasesProps {}

const Cases: NextPage = () => {
  return (
    <MainLayout title="Main">
      <CommonSection
        contentOrder="column"
        title="Our cases"
        buttonType="none"
        isCaseSection
      >
        <CaseFilters />
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export default Cases;
