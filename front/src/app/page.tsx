import {
  CaseCard,
  CommonSection,
  Contacts,
  HeaderSection,
  MainLayout,
  ProcessCard,
  ServiceCard,
} from "@/components";
import { getTranslateDictionary } from "@/i18n/dictionaries";

const Home = async () => {
  const content = await getTranslateDictionary();

  return (
    <MainLayout>
      <HeaderSection description={content.home.description} />
      <CommonSection
        title={content.services.titleOne}
        buttonType="outlinedWithBackground"
        contentOrder="row"
        background
        redirectTo="services"
        fullWidth
      >
        {content.services.header.ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <CommonSection
        title={content.cases.title}
        buttonType="filled"
        contentOrder="column"
        background={false}
        buttonText={content.buttons.seeMore}
        redirectTo="cases"
      >
        {content.cases.ourCases
          .filter((itm) => itm.isMain)
          .map((itm) => (
            <CaseCard key={itm.id} card={itm} />
          ))}
      </CommonSection>
      <CommonSection
        title={content.process.title}
        buttonType="outlinedWithBackground"
        contentOrder="row"
        background
        buttonText={content.buttons.seeMore}
        redirectTo="process"
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
