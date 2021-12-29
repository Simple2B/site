import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CommonSection } from "../components/Sections/CommonSection";
import { HeaderSection } from "../components/Sections/HeaderSection";
import { MainLayout } from "../layouts/Main";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <MainLayout title="Main">
      <HeaderSection />
      <CommonSection title="Services" buttonType="outlined" />
      <CommonSection title="Cases" buttonType="filled" />
      <CommonSection title="Work process" buttonType="outlined" />
    </MainLayout>
  );
};

export default Home;
