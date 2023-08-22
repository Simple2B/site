import { Cases } from "@/components";
import { CaseOut, CaseService, StackOut, StacksService } from "@/openapi";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Cases",
};

export const revalidate = 10;

const Page = async () => {
  let stacks: StackOut[] = [];
  let cases: CaseOut[] = [];
  try {
    stacks = await StacksService.getAllStacks();
    cases = (await CaseService.getAllCases()).cases;
  } catch (error) {
    return notFound();
  }

  return <Cases stacks={stacks} cases={cases} />;
};

export default Page;
