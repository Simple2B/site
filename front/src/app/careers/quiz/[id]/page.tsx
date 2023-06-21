import { options } from "@/app/options";
import QuizStart from "@/components/Career/QuizStart";
import { OpenAPI, QuestionService } from "@/openapi";
import { log } from "console";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ISoldierPageProps {
  params: { id: string };
}
const Page = async ({ params }: ISoldierPageProps) => {
  const session = await getServerSession(options);
  const user_uuid = session?.user.user_uuid;
  if (!user_uuid) {
    redirect("/singin");
  }

  let res;
  try {
    res = await QuestionService.getRandomQuestion(user_uuid);
  } catch (error) {
    console.log(`Can't get random question`, error);
    redirect("/singin");
  }
  if (!res.question) {
    return <div>Sorry you already answer on all questions</div>;
  }

  return <QuizStart question={res.question} count={15} userId={1} />;
};

export default Page;
