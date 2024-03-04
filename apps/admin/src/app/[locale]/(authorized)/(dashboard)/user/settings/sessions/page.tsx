import { Suspense } from "react"

import { auth } from "@prismedis/auth"

import { api } from "@/trpc/server"
import { SessionCardSkeleton, SessionList } from "../components/sessions"

export default async function SessionsPage() {
  const session = await auth()

  const sessions = api.user.sessions()

  return (
    <>
      <div className="grid w-full gap-y-2">
        <Suspense
          fallback={
            <div className="flex w-full flex-col gap-4">
              <SessionCardSkeleton />
              <SessionCardSkeleton />
            </div>
          }
        >
          <SessionList sessions={sessions} sessionId={session.session!.id} />
        </Suspense>
      </div>
    </>
  )
}
