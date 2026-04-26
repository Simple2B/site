import {
  Accordion,
  CommonSection,
  CustomList,
  ServiceHeader,
} from '@/components';
import { getDictionaryByLang } from '@/i18n/dictionaries';
import { i18n } from '@/i18n/i18n-config';

export const metadata = {
  title: 'Services',
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

interface PageParams {
  params: { lang: string };
}

const Page = async ({ params }: PageParams) => {
  const { content } = await getDictionaryByLang(params.lang);
  const services = content.services;

  return (
    <>
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
