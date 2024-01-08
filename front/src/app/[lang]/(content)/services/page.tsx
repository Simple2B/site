import {
  Accordion,
  CommonSection,
  CustomList,
  GoogleAds,
  ServiceHeader,
} from '@/components';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { Languages } from '@/openapi';

export const metadata = {
  title: 'Services',
};

const Page = async () => {
  const { content, lang } = await getTranslateDictionary();
  const services = content.services;

  return (
    <>
      <>{lang === Languages.DE && <GoogleAds />}</>
      <CommonSection
        contentOrder="column"
        title={services.titleOne}
        buttonType="none"
        isCaseSection
        fullWidth
      >
        <ServiceHeader
          title={services.header.title}
          ourServices={services.header.ourServices}
        />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title={services.titleTwo}
        buttonType="none"
        isCaseSection
        background
        fullWidth
      >
        <CustomList icon="pin" list={services.info.what_we_do} />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title={services.titleThree}
        buttonType="outlined"
        buttonText={content.buttons.cases}
        redirectTo="cases"
        isCaseSection
        fullWidth
      >
        <Accordion ourTechnologies={services.info.technologies} />
      </CommonSection>
    </>
  );
};

export default Page;
