import { CommonSection } from '@/components';
import { CaseHeader } from '@/components/CasePage/CaseHeader';
import { CaseGallery } from '@/components/CasePage/CaseGallery';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { notFound } from 'next/navigation';
import { CaseService, Languages } from '@/openapi';

export interface ICase {
  slug_name: string;
}

const Case = async ({ slug_name }: ICase) => {
  const { content, lang } = await getTranslateDictionary();

  let caseCard = null;
  try {
    caseCard = await CaseService.getCaseBySlug(slug_name, lang as Languages);
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
