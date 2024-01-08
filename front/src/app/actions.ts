'use server';

import { cookies } from 'next/headers';
import { CandidateService, ClientService, Languages } from '@/openapi';
import { redirect } from 'next/navigation';

type UserType = 'candidate' | 'client';

async function addCV(id: string, data: FormData, user_type: UserType) {
  let response = null;

  if (user_type === 'client') {
    const cookieStore = cookies();
    const lang = cookieStore.get('n18i')?.value ?? 'en';
    console.log('lang: ', lang);
    response = await ClientService.contactForm(id, data, lang as Languages);
  } else {
    response = await CandidateService.applicationForm(id, data);
  }

  return response;
}

export default addCV;

async function setLanguage(curPath: string) {
  const cookieStore = cookies();
  const lang = cookieStore.get('n18i')?.value ?? 'en';
  let newLang = '';
  if (lang === 'de') {
    newLang = 'en';
  } else {
    newLang = 'de';
  }
  cookieStore.set('n18i', newLang);
  const redirectPth = curPath.replace(`/${lang}`, `/${newLang}`);
  redirect(redirectPth);
}

export { setLanguage };
