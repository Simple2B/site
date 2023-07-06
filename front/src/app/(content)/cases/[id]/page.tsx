import { Case, Contacts } from "@/components";

export interface PageParams {
  params: { id: string };
}

const Page = ({ params }: PageParams) => {
  const caseId = params.id;
  return <Case caseId={caseId} />;
};

export default Page;
