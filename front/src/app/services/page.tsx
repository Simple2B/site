import {
  Accordion,
  CommonSection,
  Contacts,
  CustomList,
  MainLayout,
  ServiceHeader,
} from "@/components";
import { WHAT_WE_DO } from "@/types/services";
import { cookies } from "next/headers";
import { getDictionary } from "../dictionaries";

export const metadata = {
  title: "Services",
};

const Page = async () => {
  const cookieStore = cookies();
  const lang = cookieStore.get("n18i")?.value ?? "en";

  const dict = await getDictionary(lang as "en" | "de");

  console.log(dict.products.cart, "translation");

  return (
    <MainLayout>
      <CommonSection
        contentOrder="column"
        title="Services"
        buttonType="none"
        isCaseSection
        fullWidth
      >
        <ServiceHeader />
        <h1>{dict.products.cart}</h1>
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="What we do"
        buttonType="none"
        isCaseSection
        background
      >
        <CustomList icon="pin" list={WHAT_WE_DO} />
      </CommonSection>
      <CommonSection
        contentOrder="column"
        title="Featured Technologies"
        buttonType="outlined"
        buttonText="See our cases"
        redirectTo="cases"
        isCaseSection
      >
        <Accordion />
      </CommonSection>
      <Contacts background />
    </MainLayout>
  );
};

export default Page;
