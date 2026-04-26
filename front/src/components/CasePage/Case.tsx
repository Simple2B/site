import { CommonSection } from '@/components';
import { CaseHeader } from '@/components/CasePage/CaseHeader';
import { CaseGallery } from '@/components/CasePage/CaseGallery';
import { getDictionaryByLang } from '@/i18n/dictionaries';
import { notFound } from 'next/navigation';
import { getCaseBySlug } from '@/lib/staticData';
import type { CaseData } from '@/types/data';


export interface ICase {
  slug_name: string;
  lang: string;
}

const Case = async ({ slug_name, lang }: ICase) => {
  const { content } = await getDictionaryByLang(lang);

  const caseCard: CaseData | undefined = getCaseBySlug(slug_name, lang);

  if (!caseCard) {
    notFound();
  }

  return (
    <CommonSection
      contentOrder="column"
      title={caseCard.title}
      subtitle={caseCard.subTitle}
      buttonType="filled"
      buttonText={content.buttons.cases}
      isCaseSection
      redirectTo="cases"
      fullWidth
    >
      <div className="xs:max-w-[280px]">
        <CaseHeader caseCard={caseCard} content={content.cases.header} />
        <CaseGallery caseCard={caseCard} />
      </div>
    </CommonSection>
  );
};

export { Case };
