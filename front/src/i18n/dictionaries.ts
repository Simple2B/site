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

export const getDictionaryByLang = async (lang: string) => {
  const locale = (i18n.locales.includes(lang as Locale) ? lang : 'en') as Locale;
  const content = await getDictionary(locale);
  return { content, lang: locale };
};
