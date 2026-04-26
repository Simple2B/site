import type { CaseData, StackData } from '@/types/data';
import { Cases } from '@/components';
import { getDictionaryByLang } from '@/i18n/dictionaries';
import { i18n } from '@/i18n/i18n-config';
import { getCases, getStacks } from '@/lib/staticData';

export const metadata = {
  title: 'Cases',
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

interface PageParams {
  params: { lang: string };
}

const Page = async ({ params }: PageParams) => {
  const { content, lang } = await getDictionaryByLang(params.lang);
  const title = content.buttons.cases;

  const cases: CaseData[] = getCases({ is_main: false, lang });
  const stacks: StackData[] = getStacks();

  return (
    <div>
      <Cases stacks={stacks} cases={cases} title={title} />
    </div>
  );
};

export default Page;
