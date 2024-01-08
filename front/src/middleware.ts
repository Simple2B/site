import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Locale, i18n } from './i18n/i18n-config';

const REGEX = /(?<=simple2b)\.de/;
export function middleware(request: NextRequest) {
  let language = i18n.defaultLocale as Locale;
  const domaineNameUrl = request.headers.get('referer');
  const curLanguage = request.cookies.get('n18i')?.value;
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) {
    return;
  }
  // console.log('language: ', language);
  const isGermanDomain = REGEX.test(domaineNameUrl || '');
  // console.log('curLanguage: ', curLanguage);
  if (curLanguage) {
    language = curLanguage as Locale;
  } else if (domaineNameUrl && isGermanDomain && !curLanguage) {
    language = 'de';
  }

  request.nextUrl.pathname = `/${language}${pathname}`;
  const response = NextResponse.redirect(
    new URL(request.nextUrl.pathname, request.url)
  );
  response.cookies.set('n18i', language);
  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` `careers` ...
  matcher: ['/((?!api|careers|signin|_next/static|_next/image|favicon.ico).*)'],
};
