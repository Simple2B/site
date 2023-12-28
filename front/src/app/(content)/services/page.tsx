import {
  Accordion,
  CommonSection,
  CustomList,
  GoogleAds,
  ServiceHeader,
} from '@/components';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { Languages } from '@/openapi';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Services',
};

const Page = async () => {
  const dict = await getTranslateDictionary();
  const content = dict.services;
  const cookieStore = cookies();
  const lang = cookieStore.get('n18i')?.value ?? 'en';

  return (
    <>
      <>{lang === Languages.DE && <GoogleAds />}</>
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
        fullWidth
      >
        <CustomList icon="pin" list={content.info.what_we_do} />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title={content.titleThree}
        buttonType="outlined"
        buttonText={dict.buttons.cases}
        redirectTo="cases"
        isCaseSection
        fullWidth
      >
        <Accordion ourTechnologies={content.info.technologies} />
      </CommonSection>
    </>
  );
};

export default Page;
