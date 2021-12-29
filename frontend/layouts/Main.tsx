import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";

export interface IMainLayoutProps {
  title?: string;
}
export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  title = "Page",
}) => {
  return (
    <>
      <Head>
        <title>{title} | Simple2B</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};
