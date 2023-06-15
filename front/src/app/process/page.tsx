import { processCard } from "@/types/process";
import {
  CommonSection,
  Contacts,
  MainLayout,
  ProcessCardExtended,
} from "@/components";

const Process = () => {
  return (
    <MainLayout>
      <CommonSection
        contentOrder="column"
        title="Work Process"
        buttonType="filled"
        buttonText="See Our Cases"
        redirectTo="cases"
        isCaseSection
      >
        {processCard.map((itm) => (
          <ProcessCardExtended key={itm.id} card={itm} />
        ))}
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export default Process;
