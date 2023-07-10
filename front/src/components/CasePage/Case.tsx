import { CommonSection } from "@/components";
import { CaseHeader } from "@/components/CasePage/CaseHeader";
import { CaseGallery } from "@/components/CasePage/CaseGallery";
import { getTranslateDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

export interface ICase {
  caseId: string;
}

const Case = async ({ caseId }: ICase) => {
  const dict = await getTranslateDictionary();
  const content = dict.cases;
  const card = content.ourCases.find((item) => item.id === Number(caseId));

  if (!card) {
    notFound();
  }

  return (
    <CommonSection
      contentOrder="column"
      title={card.title}
      subtitle={card.subtitle}
      buttonType="filled"
      buttonText={dict.buttons.cases}
      isCaseSection
      redirectTo="cases"
    >
      <CaseHeader caseCard={card} content={dict.cases.header} />
      <CaseGallery caseCard={card} />
    </CommonSection>
  );
};

export { Case };
