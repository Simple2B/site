import { redirect } from "next/navigation";

import { QuizContainer } from "@/components/Career/QuizContainer";
import { CommonSection } from "@/components";
import { getRandomQuestion } from "@/api/question/question";

export interface Props {
  user_uuid: string;
}

const QuizStart = async ({ user_uuid }: Props) => {
  let res;
  const data = await getRandomQuestion(user_uuid);

  try {
    res = data.data;
  } catch (error) {
    console.log(`Can't get random question`, error);
    redirect("/singin");
  }

  if (!res.question) {
    return redirect("/careers/contacts");
  }

  return (
    <CommonSection
      contentOrder="column"
      title="Career Quiz"
      buttonType="none"
      isCaseSection
      fullWidth
      background
      dense
    >
      <QuizContainer question={res.question} />
    </CommonSection>
  );
};

export default QuizStart;
