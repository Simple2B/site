import { CommonSection } from '@/components';
import { CaseHeader } from '@/components/CasePage/CaseHeader';
import { CaseGallery } from '@/components/CasePage/CaseGallery';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import { notFound } from 'next/navigation';
import { CaseService, Languages } from '@/openapi';
import { cookies } from 'next/headers';

export interface ICase {
  slug_name: string;
}

const Case = async ({ slug_name }: ICase) => {
  const dict = await getTranslateDictionary();
  const cookieStore = cookies();
  const lang = cookieStore.get('n18i')?.value ?? 'en';

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
      buttonText={dict.buttons.cases}
      isCaseSection
      redirectTo="cases"
    >
      <CaseHeader caseCard={caseCard} content={dict.cases.header} />
      <CaseGallery caseCard={caseCard} />
    </CommonSection>
  );
};

export { Case };
