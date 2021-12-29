import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HeaderSection } from "../components/Sections/HeaderSection";
import { MainLayout } from "../layouts/Main";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <MainLayout title="Main">
      <HeaderSection />
    </MainLayout>
  );
};

export default Home;
