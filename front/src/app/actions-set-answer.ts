'use server'

import { CandidateService } from "@/openapi";

async function setAnswerAction(userId: string, answerId: string) {
  await CandidateService.setAnswer({
    user_uuid: userId,
    answer_id: Number(answerId),
  });
}

export default setAnswerAction;
