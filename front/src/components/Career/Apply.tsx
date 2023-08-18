import { getServerSession } from "next-auth/next";
import { QuestionService } from "@/openapi";
import { options } from "@/app/options";
import NavigateBtn from "../Buttons/NavigateBtn";
import { headers } from "next/headers";

const BtnApply = async () => {
  const pathName = headers().get("referer");

  const session = await getServerSession(options(pathName));
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
        <NavigateBtn title="Sign In to apply" pushTo="signin"></NavigateBtn>
      )}
    </div>
  );
};

export default BtnApply;
