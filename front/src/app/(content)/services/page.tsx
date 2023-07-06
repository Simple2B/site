import {
  Accordion,
  CommonSection,
  CustomList,
  ServiceHeader,
} from "@/components";
import { getTranslateDictionary } from "@/i18n/dictionaries";

export const metadata = {
  title: "Services",
};

const Page = async () => {
  const dict = await getTranslateDictionary();
  const content = dict.cervices;

  return (
    <>
      <CommonSection
        contentOrder="column"
        title={content.titleOne}
        buttonType="none"
        isCaseSection
        fullWidth
      >
        <ServiceHeader
          title={content.header.title}
          ourServices={content.header.ourServices}
        />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title={content.titleTwo}
        buttonType="none"
        isCaseSection
        background
      >
        <CustomList icon="pin" list={content.info.what_we_do} />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title={content.titleThree}
        buttonType="outlined"
        buttonText="See our cases"
        redirectTo="cases"
        isCaseSection
      >
        <Accordion ourTechnologies={content.info.technologies} />
      </CommonSection>
    </>
  );
};

export default Page;
