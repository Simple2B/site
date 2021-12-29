import Head from "next/head";
import React from "react";

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
      <div className="container">{children}</div>
    </>
  );
};
