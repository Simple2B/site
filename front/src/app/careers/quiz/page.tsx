import { options } from "@/app/options";
import QuizStart from "@/components/Career/QuizStart";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from 'next/headers'

const Page = async () => {
  const path = headers().get('referer');
  console.log('--- Quiz Page path---', path);


  const session = await getServerSession(options(path));
  const user_uuid = session?.user.user_uuid;
  if (!user_uuid) {
    redirect("/singin");
  }
  return <QuizStart user_uuid={user_uuid} />;
};

export default Page;
