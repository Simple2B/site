import { Cases, GoogleAds } from '@/components';
import { getTranslateDictionary } from '@/i18n/dictionaries';
import {
  CaseOut,
  CaseService,
  Languages,
  StackOut,
  StacksService,
} from '@/openapi';

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
    stacks = await StacksService.getAllStacks();
    cases = (await CaseService.getAllCases(false, lang as Languages)).cases;
  } catch (error) {
    return notFound();
  }

  return (
    <>
      <>{lang === Languages.DE && <GoogleAds />}</>
      <Cases stacks={stacks} cases={cases} title={title} />;
    </>
  );
};

export default Page;
