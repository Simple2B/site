import { getAllCases } from '@/api/case/case';
import { CaseOut, Languages, StackOut } from '@/api/model';
import { getAllStacks } from '@/api/stacks/stacks';
import { Cases, GoogleAds } from '@/components';
import { getTranslateDictionary } from '@/i18n/dictionaries';


import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Cases',
};

export const revalidate = 10;

const Page = async () => {
  let stacks: StackOut[] = [];
  let cases: CaseOut[] = [];
  const { content, lang } = await getTranslateDictionary();
  const title = content.buttons.cases;

  try {
    const resCases = await getAllCases({ is_main: false, lang: lang as Languages });
    cases = resCases.data.cases || [];
    const resStacks = await getAllStacks();
    stacks = resStacks.data

  } catch (error) {
    return notFound();
  }

  return (
    <div>
      <>{lang === Languages.de && <GoogleAds />}</>
      <Cases stacks={stacks} cases={cases} title={title} />;
    </div>
  );
};

export default Page;
