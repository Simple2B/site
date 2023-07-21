import { getServerSession } from "next-auth/next";
import { QuestionService } from "@/openapi";
import { options } from "@/app/options";
import NavigateBtn from "../Buttons/NavigateBtn";
import { headers } from "next/headers";

const BtnApply = async () => {
  const path = headers().get('referer');
  console.log('--- BtnApply server component path ---', path);

  const session = await getServerSession(options(path));
  const user_uuid = session?.user.user_uuid;

  let isQuizCompleted = false;

  if (user_uuid) {
    const res = await QuestionService.getRandomQuestion(user_uuid);

    isQuizCompleted = !res.question;
  }

  return (
    <div>
      {session ? (
        <NavigateBtn
          title="Apply"
          pushTo={isQuizCompleted ? "careers/contacts" : "careers/quiz"}
        />
      ) : (
        <NavigateBtn title="Sign In to apply" pushTo={"singin"} />
      )}
    </div>
  );
};

export default BtnApply;
