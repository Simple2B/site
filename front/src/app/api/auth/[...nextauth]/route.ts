import { options } from "@/app/options";
import NextAuth from "next-auth"

import type { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server";

async function auth(req: any, res: NextApiResponse) {
  if (req instanceof Request || NextRequest) {
    console.log('|||||| 1 |||||| req.realm ||||||||||||', req);
    console.log('|||||| 2 |||||| req.headers.get ||||||||||||', req.headers.get('referer'));
    console.log('|||||| 3 |||||| req.hostname ||||||||||||', req.hostname);
    console.log('|||||| 4 |||||| req.headers.host ||||||||||||', req.headers.get('host'));

    return await NextAuth(req, res, options(req.url))
  }
  // Do whatever you want here, before the request is passed down to `NextAuth`

  console.log('--- auth router => req.url ---', req.url);

  return await NextAuth(req, res, options(req.url))
}

export { auth as GET, auth as POST }
// const handler = NextAuth(options())
// export { handler as GET, handler as POST }
