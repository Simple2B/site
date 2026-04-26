import { CaseData } from '@/types/data';
import {
  CaseCard,
  CommonSection,
  Contacts,
  HeaderSection,
  MainLayout,
  ProcessCard,
  ServiceCard,
} from '@/components';
import { FeedbackSection } from '@/components/FeedbackSection/FeedbackSection';
import { getDictionaryByLang } from '@/i18n/dictionaries';
import { i18n } from '@/i18n/i18n-config';
import { getCases } from '@/lib/staticData';

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

interface PageParams {
  params: { lang: string };
}

const Home = async ({ params }: PageParams) => {
  const { content, lang } = await getDictionaryByLang(params.lang);
  const cases: CaseData[] = getCases({ is_main: true, lang });

  return (
    <MainLayout lang={lang}>
      <HeaderSection
        description={content.home.description}
        textBtnGetInTouch={content.home.btnGetInTouch}
      />
      <CommonSection
        title={content.services.titleOne}
        buttonType="outlinedWithBackground"
        contentOrder="row"
        buttonText={content.services.titleFour}
        background
        redirectTo="services"
        fullWidth
      >
        {content.services.header.ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <>
        {cases.length > 0 && (
          <CommonSection
            title={content.cases.title}
            buttonType="filled"
            contentOrder="column"
            background={false}
            buttonText={content.buttons.seeMore}
            redirectTo="cases"
            fullWidth
          >
            {cases.map((itm) => (
              <CaseCard key={itm.slugName} card={itm} lang={lang} />
            ))}
          </CommonSection>
        )}
      </>
      <CommonSection
        title={content.process.title}
        buttonType="outlinedWithBackground"
        contentOrder="row"
        background
        buttonText={content.buttons.seeMore}
        redirectTo="process"
        fullWidth
      >
        {content.process.cards.map((itm) => (
          <ProcessCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <FeedbackSection lang={lang} />
      <Contacts background lang={lang} />
    </MainLayout>
  );
};

export default Home;
