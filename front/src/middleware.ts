import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Locale, i18n } from './i18n/i18n-config';

const REGEX = /(?<=simple2b)\.de/;

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  let language: Locale = i18n.defaultLocale;
  const domaineNameUrl = request.headers.get('referer');

  const isGermanDomain = REGEX.test(domaineNameUrl || '');
  // console.log('domaineNameUrl: ', domaineNameUrl, isGermanDomain);

  if (domaineNameUrl && isGermanDomain) {
    language = 'de';
  }

  response.cookies.set('n18i', 'de');

  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
