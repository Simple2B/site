import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CommonSection } from "../components/Sections/CommonSection";
import { HeaderSection } from "../components/Sections/HeaderSection";
import { ServiceCard } from "../components/ServiceCard/ServiceCard";
import { MainLayout } from "../layouts/Main";
import styles from "../styles/Home.module.css";
import { ourServices } from "../types/services";
import { ourCases } from "../types/cases";
import { CaseCard } from "../components/CaseCard/CaseCard";

const Home: NextPage = () => {
  return (
    <MainLayout title="Main">
      <HeaderSection />
      <CommonSection title="Services" buttonType="outlined" contentOrder="row">
        {ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <CommonSection title="Cases" buttonType="filled" contentOrder="column">
        {ourCases.map((itm) => (
          <CaseCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <CommonSection
        title="Work process"
        buttonType="outlined"
        contentOrder="row"
      />
    </MainLayout>
  );
};

export default Home;
