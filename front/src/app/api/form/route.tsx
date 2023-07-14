import { DefaultService } from '@/openapi';
import { NextResponse } from 'next/server'

// Incoming request: /about, browser shows /about
// Rewritten request: /proxy, browser shows /about
export const GET = async (request: Request) => {
  console.log('===============H================');

  // want to redirect request to another to api server and get response from there and return it to client
  // return NextResponse.rewrite(new URL('http://localhost:5009/docs', request.url))

  const response = await DefaultService.rootGet();
  console.log('===RES====', response);

  return NextResponse.json(response);
}
