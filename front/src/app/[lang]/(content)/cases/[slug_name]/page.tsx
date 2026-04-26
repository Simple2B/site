import { Case } from '@/components';
import { getAllSlugs } from '@/lib/staticData';

export function generateStaticParams() {
  return getAllSlugs().map(({ lang, slug_name }) => ({ lang, slug_name }));
}

export interface PageParams {
  params: { lang: string; slug_name: string };
}

const Page = ({ params }: PageParams) => {
  return <Case slug_name={params.slug_name} lang={params.lang} />;
};

export default Page;
