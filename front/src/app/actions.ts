'use server'

import { CandidateService } from "@/openapi";


export async function addCV(id: string, data: FormData) {
  await CandidateService.attachCv(id, data);
}
