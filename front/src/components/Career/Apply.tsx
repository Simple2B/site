import { getServerSession } from "next-auth/next";
import { QuestionService } from "@/openapi";
import { options } from "@/app/options";
import NavigateBtn from "../Buttons/NavigateBtn";

const BtnApply = async () => {
  const session = await getServerSession(options);
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
