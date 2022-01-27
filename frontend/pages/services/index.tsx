import { NextPage } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Contacts } from "../../components/Contacts/Contacts";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { ServiceHeader } from "../../components/Services/ServiceHeader";
import { WhatWeDo } from "../../components/Services/WhatWeDo";
import { Accordion } from "../../components/Accordion/Accordion";

export interface IcasesProps {}

const Services: NextPage = () => {
  return (
    <MainLayout title="Main">
      <CommonSection
        contentOrder="column"
        title="Services"
        buttonType="none"
        isCaseSection
      >
        <ServiceHeader />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="What we do"
        buttonType="none"
        isCaseSection
        background
      >
        <WhatWeDo />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="Featured Technologies"
        buttonType="outlined"
        buttonText="See our cases"
        isCaseSection
      >
        <Accordion />
      </CommonSection>
      <Contacts />
    </MainLayout>
  );
};

export default Services;
