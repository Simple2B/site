import { Case, Contacts, MainLayout } from "@/components";

export interface PageParams {
  params: { id: string };
}

const Page = ({ params }: PageParams) => {
  const caseId = params.id;
  return (
    <MainLayout title="Cases">
      <Case caseId={caseId} />
      <Contacts background />
    </MainLayout>
  );
};

export default Page;
