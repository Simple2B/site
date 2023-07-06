import { CaseCard, Cases } from "@/components";
import { getTranslateDictionary } from "@/i18n/dictionaries";

export const metadata = {
  title: "Cases",
};

const Page = async () => {
  const dict = await getTranslateDictionary();

  const content = dict.cases;

  return (
    <Cases>
      {content.ourCases.map((itm) => (
        <CaseCard key={itm.id} card={itm} />
      ))}
    </Cases>
  );
};

export default Page;
