import { ourCases } from "@/types/cases";
import { Contacts } from "../../components/Contacts/Contacts";
import { CaseCard, Cases, MainLayout } from "@/components";

export const metadata = {
  title: "Cases",
};

const Page = () => {
  return (
    <MainLayout title="Cases">
      <Cases>
        {ourCases.map((itm) => (
          <CaseCard key={itm.id} card={itm} />
        ))}
      </Cases>
      <Contacts background />
    </MainLayout>
  );
};

export default Page;
