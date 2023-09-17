'server-only'
import { cookies } from 'next/headers';
import { Locale } from './i18n-config'


const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export const getTranslateDictionary = async () => {
  const cookieStore = cookies();
  const lang = cookieStore.get("n18i")?.value ?? "en";

  return await getDictionary(lang as Locale);
}
