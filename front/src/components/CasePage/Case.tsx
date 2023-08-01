import { CommonSection } from "@/components";
import { CaseHeader } from "@/components/CasePage/CaseHeader";
import { CaseGallery } from "@/components/CasePage/CaseGallery";
import { getTranslateDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { CaseService } from "@/openapi";

export interface ICase {
  slug_name: string;
}

const Case = async ({ slug_name }: ICase) => {
  const dict = await getTranslateDictionary();

  let caseCard = null;
  try {
    caseCard = await CaseService.getCaseBySlug(slug_name);
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
      subtitle={caseCard.sub_title}
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
