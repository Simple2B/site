import { CommonSection, ProcessCardExtended } from '@/components';
import { getTranslateDictionary } from '@/i18n/dictionaries';

export const metadata = {
  title: 'Process',
};

const Process = async () => {
  const { content } = await getTranslateDictionary();
  const process = content.process;

  return (
    <CommonSection
      contentOrder="column"
      title={process.title}
      buttonType="filled"
      buttonText={content.buttons.cases}
      redirectTo="cases"
      isCaseSection
      fullWidth
    >
      {process.cards.map((itm) => (
        <ProcessCardExtended key={itm.id} card={itm} />
      ))}
    </CommonSection>
  );
};

export default Process;
