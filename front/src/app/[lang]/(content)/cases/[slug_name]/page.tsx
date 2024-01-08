import { Case } from '@/components';

export interface PageParams {
  params: { slug_name: string };
}
export const revalidate = 10;

const Page = ({ params }: PageParams) => {
  const slug_name = params.slug_name;
  return <Case slug_name={slug_name} />;
};

export default Page;
