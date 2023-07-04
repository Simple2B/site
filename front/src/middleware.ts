import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  let language = "en"
  const domaineNameUrl = request.headers.get("referer")

  if (domaineNameUrl && domaineNameUrl.includes("dev.simple2b.com")) {
    language = "de"
  }
  response.cookies.set('n18i', language)
  return response
}


export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}