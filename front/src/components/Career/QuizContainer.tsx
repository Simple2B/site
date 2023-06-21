// import { useCallback, useEffect, useState, useTransition } from "react";
// import { useRouter } from "next/navigation";

import classes from "./Career.module.scss";

import { QuizQuestion } from "./QuizQuestion";
import { CandidateService, OpenAPI, Question, QuestionOut } from "@/openapi";
import { getServerSession } from "next-auth";
import { options } from "@/app/options";
import { redirect } from "next/navigation";

// const TOTAL_QUESTIONS = 25;
// const getProgress = (total: number, current: number) => (current / total) * 100;
// const myRandomInts = (quantity: number, max: number) => {
//   const set: Set<number> = new Set();
//   while (set.size < quantity) {
//     set.add(Math.floor(Math.random() * max) + 1);
//   }
//   return set;
// };
// const provideTmpQuestions = () => {
//   return questions.questions.map((itm, idx): IQuizQuestion => {
//     const answers = itm.answers.map((itm, idx): IQuizAnswer => {
//       return { id: idx, text: itm.text, correct: itm.correct };
//     });
//     return { id: idx, text: itm.text, answers };
//   });
// };

interface Props {
  count: number;
  vacancyId: number;
  userId: number;
  question: Question;
}
export const QuizContainer = async ({
  count,
  vacancyId,
  userId,
  question,
}: Props) => {
  console.log("question: ", question);

  // const router = useRouter();

  const session = await getServerSession(options);

  if (!session) {
    return redirect("/singin");
  }

  // console.log(session, "s");

  // console.log(session, "session");

  // const [step, setStep] = useState(0);
  // const [progress, setProgress] = useState(0);
  // const [questionsNumbers, setQuestionsNumbers] = useState<number[]>([]);
  // const [currentQuestion, setCurrentQuestion] = useState<IQuizQuestion>();
  // const [answerId, setAnswerId] = useState<number | undefined>(undefined);
  // const [currentAttempt, setCurrentAttempt] = useState<IQuizAttempt | null>(
  //   null
  // );

  const handleSubmit = async (data: FormData) => {
    "use server";

    const user_uuid = session.user.user_uuid;
    const answer_id = data.get("question");

    if (!answer_id || isNaN(Number(answer_id)) || !user_uuid) return;

    const res = await CandidateService.setAnswer({
      user_uuid: user_uuid,
      answer_id: Number(answer_id),
    });

    // redirect("/careers/quiz/1");
    // setAnswer(Number(answer_id), token as string);
  };

  // let [isPending, startTransition] = useTransition();

  // const selectAnswer = (id: number) => {
  //   setAnswerId(id);
  // };

  // const createAttempt = useCallback(
  //   async (questions: number[]) => {
  //     const attempt = await quizApi.postAttempt(userId, questions, 0);
  //     setCurrentAttempt(attempt);
  //   },
  //   [userId]
  // );

  return (
    <div className={classes.quiz__container}>
      <div className={classes.quiz__top}></div>
      <form className={classes.quiz__bottom} action={handleSubmit}>
        {/* <input type="text" name="test_input" /> */}
        {question && <QuizQuestion question={question} />}
        <button
          style={{ color: "red", width: "20px", height: "20px" }}
          type="submit"
        >
          submit
        </button>
        {/* <CustomButton
          onClick={handleSubmitAnswer}
          type={buttonColor}
          title={buttonText}
          size="large"
          extraClasses={classes.quiz__button}
        /> */}

        <div className={classes.quiz__progress_container}>
          <h4 className={classes.quiz__progress_title}>Progress</h4>
          {/* <progress
            id="file"
            max="100"
            value={progress}
            className={classes.quiz__progress_component}
          /> */}
        </div>
      </form>
    </div>
  );
};
