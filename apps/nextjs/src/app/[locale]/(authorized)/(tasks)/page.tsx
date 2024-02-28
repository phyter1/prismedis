// import { Suspense } from "react"

// import { CreatePostForm, PostCardSkeleton, PostList } from "@/components/posts"
// import { api } from "@/trpc/server"

export default async function HomePage() {
  // const posts = api.post.all()

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Prismedis <span className="text-primary">Console</span>
        </h1>
      </div>
    </main>
  )
}
