import { options } from "@/app/options";
import QuizStart from "@/components/Career/QuizStart";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  console.log('---------------------------- ROUT RELOAD ----------------------------');

  const session = await getServerSession(options);
  const user_uuid = session?.user.user_uuid;
  if (!user_uuid) {
    redirect("/singin");
  }
  return <QuizStart user_uuid={user_uuid} />;
};

export default Page;
