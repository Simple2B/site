'use server'

import { CandidateService } from "@/openapi";

async function addCV(id: string, data: FormData) {
  await CandidateService.attachCv(id, data);
}

export default addCV;
