import { options } from "@/app/options";
import NextAuth from "next-auth"

import type { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server";

async function auth(req: any, res: NextApiResponse) {
  if (req instanceof Request || NextRequest) {
    console.log('|||||| 1 |||||| instanceof ||||||||||||', req);
    console.log('|||||| 2 |||||| req.url.host ||||||||||||', req.url.host);
    console.log('|||||| 3 |||||| req.headers ||||||||||||', req.headers);
    console.log('|||||| 4 |||||| req.headers.host ||||||||||||', req.headers.host);
    console.log('|||||| 5 |||||| req.urlList ||||||||||||', req.urlList);
    console.log('|||||| 6 |||||| req.headersList ||||||||||||', req.headersList);



    return await NextAuth(req, res, options(req.url))
  }
  // Do whatever you want here, before the request is passed down to `NextAuth`

  console.log('--- auth router => req.url ---', req.url);

  return await NextAuth(req, res, options(req.url))
}

export { auth as GET, auth as POST }
// const handler = NextAuth(options())
// export { handler as GET, handler as POST }
