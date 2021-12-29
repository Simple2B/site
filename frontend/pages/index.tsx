import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { MainLayout } from "../layouts/Main";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <MainLayout title="Main">
      <h1>Main</h1>
    </MainLayout>
  );
};

export default Home;
