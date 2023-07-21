import { options } from "@/app/options";
import NextAuth from "next-auth"

import type { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server";

async function auth(req: any, res: NextApiResponse) {
  if (req instanceof Request || NextRequest) {
    // console.log('|||||| 0 |||||| resssssssssssssss ||||||||||||', res);
    // console.log('|||||| 1 |||||| req ||||||||||||', req);
    console.log('|||||| 2 |||||| req.headers.get referer ||||||||||||', req.headers.get('referer'));
    // console.log('|||||| 3 |||||| req headers ||||||||||||', req.headers);
    console.log('|||||| 9 |||||| req cookies ||||||||||||', req.cookies.get('n18i'));


    return await NextAuth(req, res, options(req.headers.get('referer')));
  }
  // Do whatever you want here, before the request is passed down to `NextAuth`

  console.log('--- auth router => after if ---');

  return await NextAuth(req, res, options(req.headers.get('referer')));
}

export { auth as GET, auth as POST }
// const handler = NextAuth(options())
// export { handler as GET, handler as POST }
