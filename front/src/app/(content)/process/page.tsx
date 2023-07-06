import { processCard } from "@/types/process";
import { CommonSection, Contacts, ProcessCardExtended } from "@/components";

export const metadata = {
  title: "Process",
};

const Process = () => {
  return (
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
  );
};

export default Process;
