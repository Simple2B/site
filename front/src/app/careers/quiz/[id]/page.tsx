import { options } from "@/app/options";
import QuizStart from "@/components/Career/QuizStart";
import { OpenAPI, QuestionService } from "@/openapi";
import { getServerSession } from "next-auth";

interface ISoldierPageProps {
  params: { id: string };
}
const Page = async ({ params }: ISoldierPageProps) => {
  const session = await getServerSession(options);

  OpenAPI.TOKEN = session?.user.access_token;

  const question = await QuestionService.getRandomQuestionApiQuestionGet();

  return <QuizStart question={question} count={15} userId={1} />;
};

export default Page;
