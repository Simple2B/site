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
  const dict = await getTranslateDictionary();
  const content = dict.about;

  return (
    <>
      <CommonSection
        contentOrder="row"
        title={content.titleOne}
        buttonType="none"
        isCaseSection
        fullWidth
      >
        <AboutHeader content={content.header} />
      </CommonSection>
      <CommonSection
        contentOrder="row"
        title={content.titleTwo}
        buttonType="none"
        background
        isCaseSection
        fullWidth
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
        fullWidth
      >
        <div className="flex flex-col items-center xs:max-w-[16rem]">
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
        </div>
      </CommonSection>
      <CommonSection
        contentOrder="row_wrap"
        title={content.titleFour}
        buttonType="filled"
        buttonText={dict.buttons.cases}
        redirectTo="cases"
        isCaseSection
        isAboutSection
        fullWidth
      >
        <TeamBlock team={content.team_profiles} />
      </CommonSection>
    </>
  );
};

export default Page;
