import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { AboutHeader } from "../../components/About/AboutHeader";
import { Gallery } from "../../components/About/Gallery";
import { PersonalBlock } from "../../components/About/PersonalBlock";
import { Contacts } from "../../components/Contacts/Contacts";
import { CustomList } from "../../components/List/CustomList";
import { CommonSection } from "../../components/Sections/CommonSection";
import { MainLayout } from "../../layouts/Main";
import { PROFILES } from "../../types/gallery";
import { OUR_MISSION } from "../../types/services";

const About: NextPage = () => {
  const router = useRouter();

  const handleGoToCases = useCallback(() => {
    router.push("/cases");
  }, []);
  return (
    <MainLayout title="Main">
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
        <CustomList icon="done" list={OUR_MISSION} />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="Photos"
        buttonType="none"
        isCaseSection
      >
        <Gallery />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="Leadership"
        buttonType="filled"
        buttonText="See Our Cases"
        btnCallback={handleGoToCases}
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
      <Contacts />
    </MainLayout>
  );
};

export default About;
