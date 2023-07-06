import { CommonSection, ProcessCardExtended } from "@/components";
import { getTranslateDictionary } from "@/i18n/dictionaries";

export const metadata = {
  title: "Process",
};

const Process = async () => {
  const dict = await getTranslateDictionary();
  const content = dict.process;

  return (
    <CommonSection
      contentOrder="column"
      title={content.title}
      buttonType="filled"
      buttonText={dict.buttons.cases}
      redirectTo="cases"
      isCaseSection
    >
      {content.cards.map((itm) => (
        <ProcessCardExtended key={itm.id} card={itm} />
      ))}
    </CommonSection>
  );
};

export default Process;
