'use server'

import { setAnswer } from "@/api/candidate/candidate";


async function setAnswerAction(userId: string, answerId: string) {
  await setAnswer({
    user_uuid: userId,
    answer_id: Number(answerId),
  })
}

export default setAnswerAction;
