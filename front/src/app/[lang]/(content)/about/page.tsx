import clsx from 'clsx';

import classes from '@/components/Sections/CommonSection.module.scss';
import {
  AboutHeader,
  CommonSection,
  CustomList,
  Gallery,
  PersonalBlock,
  TeamBlock,
} from '@/components';
import { getTranslateDictionary } from '@/i18n/dictionaries';

export const metadata = {
  title: 'About Us',
};

const Page = async () => {
  const { content } = await getTranslateDictionary();
  const about = content.about;

  return (
    <>
      <CommonSection
        contentOrder="row"
        title={about.titleOne}
        buttonType="none"
        isCaseSection
        fullWidth
      >
        <AboutHeader content={about.header} />
      </CommonSection>
      <CommonSection
        contentOrder="row"
        title={about.titleTwo}
        buttonType="none"
        background
        isCaseSection
        fullWidth
      >
        <CustomList isAboutSection icon="done" list={about.our_mission} />
      </CommonSection>
      <h2 className={clsx(classes.section__header)}>{about.base.photos}</h2>
      <Gallery />
      <CommonSection
        contentOrder="column"
        title={about.titleThree}
        buttonType="none"
        isCaseSection
        background
        fullWidth
      >
        <div className="flex flex-col items-center xs:max-w-[16rem]">
          {about.profiles.map((item, idx) => {
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
        </div>
      </CommonSection>
      <CommonSection
        contentOrder="row_wrap"
        title={about.titleFour}
        buttonType="filled"
        buttonText={content.buttons.cases}
        redirectTo="cases"
        isCaseSection
        isAboutSection
        fullWidth
      >
        <TeamBlock team={about.team_profiles} />
      </CommonSection>
    </>
  );
};

export default Page;
