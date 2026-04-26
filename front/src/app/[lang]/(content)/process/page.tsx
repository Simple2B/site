import { CommonSection, ProcessCardExtended } from '@/components';
import { getDictionaryByLang } from '@/i18n/dictionaries';
import { i18n } from '@/i18n/i18n-config';

export const metadata = {
  title: 'Process',
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

interface PageParams {
  params: { lang: string };
}

const Process = async ({ params }: PageParams) => {
  const { content } = await getDictionaryByLang(params.lang);
  const process = content.process;

  return (
    <CommonSection
      contentOrder="column"
      title={process.title}
      buttonType="filled"
      buttonText={content.buttons.cases}
      redirectTo="cases"
      isCaseSection
      fullWidth
    >
      {process.cards.map((itm) => (
        <ProcessCardExtended key={itm.id} card={itm} />
      ))}
    </CommonSection>
  );
};

export default Process;
