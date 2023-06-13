"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import clsx from "clsx";

import classes from "@/components/Sections/CommonSection.module.scss";
import {
  AboutHeader,
  CommonSection,
  Contacts,
  CustomList,
  Gallery,
  MainLayout,
  PersonalBlock,
  TeamBlock,
} from "@/components";
import { PROFILES, TEAM_PROFILES } from "@/types/gallery";
import { OUR_MISSION } from "@/types/services";

const About = () => {
  const router = useRouter();

  const handleGoToCases = useCallback(() => {
    router.push("/cases");
  }, []);

  return (
    <MainLayout title="About Us">
      <CommonSection
        contentOrder="row"
        title="About Us"
        buttonType="none"
        isCaseSection
      >
        <AboutHeader />
      </CommonSection>
      <CommonSection
        contentOrder="row"
        title="Our Mission"
        buttonType="none"
        background
        isCaseSection
      >
        <CustomList isAboutSection icon="done" list={OUR_MISSION} />
      </CommonSection>
      <h2 className={clsx(classes.section__header)}>Photos</h2>
      <Gallery />
      <CommonSection
        contentOrder="column"
        title="Leadership"
        buttonType="none"
        isCaseSection
        background
      >
        {PROFILES.map((item, idx) => {
          return (
            <PersonalBlock
              key={item.id}
              description={item.description}
              fullName={item.fullName}
              image={item.image}
              position={item.position}
              reverse={idx % 2 !== 0}
            />
          );
        })}
      </CommonSection>
      <CommonSection
        contentOrder="row_wrap"
        title="Our Team"
        buttonType="filled"
        buttonText="See Our Cases"
        btnCallback={handleGoToCases}
        isCaseSection
        isAboutSection
      >
        {TEAM_PROFILES.map((item) => {
          return (
            <TeamBlock
              key={item.id}
              firstName={item.fullName}
              image={item.image}
              position={item.position}
            />
          );
        })}
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export { About };
