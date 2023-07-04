'use server'

import { CandidateService } from "@/openapi";

async function addCV(id: string, data: FormData) {
  const response = await CandidateService.attachCv(id, data);

  return response;
}

export default addCV;
