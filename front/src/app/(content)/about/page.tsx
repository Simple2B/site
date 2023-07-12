import clsx from "clsx";

import classes from "@/components/Sections/CommonSection.module.scss";
import {
  AboutHeader,
  CommonSection,
  CustomList,
  Gallery,
  PersonalBlock,
  TeamBlock,
} from "@/components";
import { getTranslateDictionary } from "@/i18n/dictionaries";

export const metadata = {
  title: "About Us",
};

const Page = async () => {
  const dict = await getTranslateDictionary();
  const content = dict.about;

  return (
    <>
      <CommonSection
        contentOrder="row"
        title={content.titleOne}
        buttonType="none"
        isCaseSection
      >
        <AboutHeader content={content.header} />
      </CommonSection>
      <CommonSection
        contentOrder="row"
        title={content.titleTwo}
        buttonType="none"
        background
        isCaseSection
      >
        <CustomList isAboutSection icon="done" list={content.our_mission} />
      </CommonSection>
      <h2 className={clsx(classes.section__header)}>{content.base.photos}</h2>
      <Gallery />
      <CommonSection
        contentOrder="column"
        title={content.titleThree}
        buttonType="none"
        isCaseSection
        background
      >
        {content.profiles.map((item, idx) => {
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
        title={content.titleFour}
        buttonType="filled"
        buttonText={dict.buttons.cases}
        redirectTo="cases"
        isCaseSection
        isAboutSection
      >

        <TeamBlock
          team={content.team_profiles as any}
        // key={item.id}
        // firstName={item.fullName}
        // image={item.image}
        // position={item.position}
        />
        {/* {content.team_profiles.map((item) => {
          return (
            <TeamBlock
              key={item.id}
              firstName={item.fullName}
              image={item.image}
              position={item.position}
            />
          );
        })} */}
      </CommonSection>
    </>
  );
};

export default Page;
