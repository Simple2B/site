'use server'

import { Body_attach_cv, CandidateService } from "@/openapi";

async function addCV(id: string, data: FormData) {

  let file = data.get("file") as any

  // TODO need to type it

  if (!!file) {
    file = file.blobLike;
  }


  const resData: Body_attach_cv = {
    name: data.get("name") as string,
    email: data.get("email") as string,
    phone: data.get("phone") as string,
    message: data.get("message") as string,
    file: file,
    user_type:data.get("user_type") as string,
  }
  const response = await CandidateService.attachCv(resData, id);

  return response;
}

export default addCV;
