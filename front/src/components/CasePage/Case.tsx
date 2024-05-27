import { CommonSection } from '@/components';
import { CaseHeader } from '@/components/CasePage/CaseHeader';
import { CaseGallery } from '@/components/CasePage/CaseGallery';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { notFound } from 'next/navigation';
import { getCaseBySlug } from '@/api/case/case';
import { CaseOut, Languages } from '@/api/model';


export interface ICase {
  slug_name: string;
}

const Case = async ({ slug_name }: ICase) => {
  const { content, lang } = await getTranslateDictionary();

  let caseCard: CaseOut | null = null;
  try {
    const res = await getCaseBySlug(slug_name, { lang: lang as Languages });
    caseCard = res.data
  } catch (error) {
    return notFound();
  }

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
