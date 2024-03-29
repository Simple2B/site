import {
  CaseCard,
  CommonSection,
  Contacts,
  HeaderSection,
  MainLayout,
  ProcessCard,
  ServiceCard,
} from '@/components';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { CaseOut, CaseService, Languages } from '@/openapi';

export const revalidate = 60;

const Home = async () => {
  const { content, lang } = await getTranslateDictionary();
  let cases: CaseOut[] = [];
  try {
    cases = (await CaseService.getAllCases(true, lang as Languages)).cases;
  } catch (error) {
    console.error(error);
  }

  return (
    <MainLayout>
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
              <CaseCard key={itm.slugName} card={itm} />
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
      <Contacts />
    </MainLayout>
  );
};

export default Home;
