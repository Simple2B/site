import { options } from "@/app/options";
import NextAuth from "next-auth"

import type { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server";

async function auth(req: any, res: NextApiResponse) {
  if (req instanceof Request || NextRequest) {
    console.log('|||||| 1 |||||| req.realm ||||||||||||', req);
    console.log('|||||| 2 |||||| req.headers.get ||||||||||||', req.headers.get('referer'));

    return await NextAuth(req, res, options(req.headers.get('referer')));
  }
  // Do whatever you want here, before the request is passed down to `NextAuth`

  console.log('--- auth router => after if ---');

  return await NextAuth(req, res, options(req.headers.get('referer')));
}

export { auth as GET, auth as POST }
// const handler = NextAuth(options())
// export { handler as GET, handler as POST }
