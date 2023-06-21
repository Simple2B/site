'use server'

import { CandidateService, OpenAPI } from "@/openapi";
import { getServerSession } from "next-auth";
import { options } from "./options";

export const setAnswer = async (answer_id: number, token: string) => {

  OpenAPI.TOKEN = token;

  console.log(token, "token")

  const res = await CandidateService.setAnswer({
    answer_id,
  });
  
  console.log("res", res);
};
