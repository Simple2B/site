import { redirect } from "next/navigation";
import { QuestionService } from "@/openapi";
import { QuizContainer } from "@/components/Career/QuizContainer";
import { CommonSection } from "@/components";
import { CareerForm } from "./CareerForm";

export interface Props {
  user_uuid: string;
}

const QuizStart = async ({ user_uuid }: Props) => {
  let res;

  try {
    res = await QuestionService.getRandomQuestion(user_uuid);
  } catch (error) {
    console.log(`Can't get random question`, error);
    redirect("/singin");
  }

  return (
    <>
      <CommonSection
        contentOrder="column"
        title="Career Quiz"
        buttonType="none"
        isCaseSection
        fullWidth
        background
        dense
      >
        {res.question ? (
          <QuizContainer question={res.question} />
        ) : (
          <CareerForm />
        )}
      </CommonSection>
    </>
  );
};

export default QuizStart;
