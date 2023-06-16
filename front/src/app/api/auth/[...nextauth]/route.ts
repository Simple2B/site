import { options } from "@/app/options";
import NextAuth from "next-auth"


// import type { NextApiRequest, NextApiResponse } from "next"

// async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`

//   console.log(req, 'req', res, 'res')
//   return await NextAuth(req, res, options)
// }

// export { auth as GET, auth as POST }
const handler = NextAuth(options)
export { handler as GET, handler as POST }
