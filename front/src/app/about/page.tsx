import { Contacts } from "@/components/Contacts/Contacts";
import { CustomList } from "@/components/List/CustomList";
import { CommonSection } from "@/components/Sections/CommonSection";
import { MainLayout } from "@/components/MainLayout/Main";
import classes from "@/components/Sections/CommonSection.module.scss";
// import { PersonalBlock } from "@/components/PersonalBlock";
import { PersonalBlock } from "@/components/About/PersonalBlock";

import { PROFILES, TEAM_PROFILES } from "@/types/gallery";
import { OUR_MISSION } from "@/types/services";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const Page = () => {
  const router = useRouter();

  const handleGoToCases = useCallback(() => {
    router.push("/cases");
  }, []);
  function clix(section__header: any): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <MainLayout title="About Us">
      {/* <CommonSection
        contentOrder="row"
        title="About Us"
        buttonType="none"
        isCaseSection
      >
        <AboutHeader />
      </CommonSection> */}
      <CommonSection
        contentOrder="row"
        title="Our Mission"
        buttonType="none"
        background
        isCaseSection
      >
        <CustomList isAboutSection icon="done" list={OUR_MISSION} />
      </CommonSection>
      <h2 className={clix(classes.section__header)}>Photos</h2>
      {/* <Gallery /> */}
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
      {/* <CommonSection
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
      </CommonSection> */}
      <Contacts background />
    </MainLayout>
  );
};

export default Page;
