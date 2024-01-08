'server-only';
import { cookies } from 'next/headers';
import { Locale, i18n } from './i18n-config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!i18n.locales.includes(locale)) {
    return await dictionaries.en();
  }
  return await dictionaries[locale]();
};

export const getTranslateDictionary = async () => {
  const cookieStore = cookies();
  const lang = cookieStore.get('n18i')?.value ?? 'en';

  const content = await getDictionary(lang as Locale);

  return { content, lang };
};
