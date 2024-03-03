import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter, createTRPCContext } from "@prismedis/api"
import { auth } from "@prismedis/auth"

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*")
  res.headers.set("Access-Control-Request-Method", "*")
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST")
  res.headers.set("Access-Control-Allow-Headers", "*")
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  })
  setCorsHeaders(response)
  return response
}

const handler = async (req: Request) => {
  const currentUser = await auth()

  // request ip address
  const ipAddress =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for") ??
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("fastly-client-ip") ??
    req.headers.get("true-client-ip") ??
    req.headers.get("x-client-ip") ??
    req.headers.get("x-cluster-client-ip") ??
    req.headers.get("x-forwarded") ??
    req.headers.get("forwarded-for") ??
    req.headers.get("forwarded") ??
    req.headers.get("via")

  // request user agent
  const userAgent = req.headers.get("user-agent")

  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () =>
      createTRPCContext({
        session: currentUser,
        headers: req.headers,
        ipAddress: ipAddress ?? "unknown",
        userAgent: userAgent ?? "unknown",
      }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error)
    },
  })

  setCorsHeaders(response)
  return response
}

export { handler as GET, handler as POST }
