import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  let language = "en"
  const domaineNameUrl = request.headers.get("referer")

  // TODO just exemple of how to get the domain name and set the language
  if (domaineNameUrl && domaineNameUrl.includes("dev.simple2b.net")) {
    language = "de"
  }
  response.cookies.set('n18i', language)
  return response
}


export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}