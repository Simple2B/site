import { CommonSection } from "@/components";
import { ourCases } from "@/types/cases";
import { CaseHeader } from "@/components/CasePage/CaseHeader";
import { CaseGallery } from "@/components/CasePage/CaseGallery";

export interface ICase {
  caseId: string;
}

const Case = ({ caseId }: ICase) => {
  const card = ourCases.find((item) => item.id === Number(caseId))!;

  return (
    <CommonSection
      contentOrder="column"
      title={card.title}
      subtitle={card.subtitle}
      buttonType="filled"
      buttonText="See other cases"
      isCaseSection
      redirectTo="cases"
    >
      <CaseHeader caseCard={card} />
      <CaseGallery caseCard={card} />
    </CommonSection>
  );
};

export { Case };
