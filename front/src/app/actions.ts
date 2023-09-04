'use server';

import { CandidateService, ClientService } from '@/openapi';

type UserType = 'candidate' | 'client';

async function addCV(id: string, data: FormData, user_type: UserType) {
  let response = null;

  if (user_type === 'client') {
    response = await ClientService.contactForm(id, data);
  } else {
    response = await CandidateService.applicationForm(id, data);
  }

  return response;
}

export default addCV;
