import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API

  // Setting cookies on the response using the `ResponseCookies` API
  console.log("request ------------------------->")
  console.log(request)
  console.log("request ------------------------->")
  const response = NextResponse.next()
  response.cookies.set('n18i', 'en')
  return response
}


export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}