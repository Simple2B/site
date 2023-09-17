import { options } from "@/app/options";
import NextAuth from "next-auth"

import type { NextApiRequest, NextApiResponse } from "next"

async function auth(req: any, res: NextApiResponse) {
  // Need to fix 'any' because the project doesn't build with normal types.
  // And TS throws an error on req.cookies.get.

  return await NextAuth(req, res, options(req.cookies.get('n18i').value));
}

export { auth as GET, auth as POST }
// const handler = NextAuth(options())
// export { handler as GET, handler as POST }
