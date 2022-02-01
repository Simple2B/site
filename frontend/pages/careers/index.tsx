import { NextPage } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { CommonSection } from "../../components/Sections/CommonSection";

import { MainLayout } from "../../layouts/Main";

export interface IcasesProps {}

const Careers: NextPage = () => {
  return (
    <MainLayout title="Careers">
      <CommonSection
        contentOrder="column"
        title="Careers"
        buttonType="filled"
        buttonText="See Our Cases"
        isCaseSection
        background
      ></CommonSection>
    </MainLayout>
  );
};

export default Careers;
