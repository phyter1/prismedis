"use client"

import type { RouterOutputs } from "@prismedis/api"
import { use } from "react"
import { Button } from "@prismedis/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@prismedis/ui/form"
import { Input } from "@prismedis/ui/input"
import { Skeleton } from "@prismedis/ui/skeleton"
import { toast } from "@prismedis/ui/toast"
import { UpdateProfileSchema } from "@prismedis/validators"

import { api } from "@/trpc/react"

export function UpdateProfileForm(props: {
  user: Promise<RouterOutputs["user"]["profile"]>
}) {
  const initialData = use(props.user)

  const utils = api.useUtils()
  const form = useForm({
    schema: UpdateProfileSchema,
    defaultValues: {
      name: initialData?.name ?? "",
    },
  })

  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate()
      toast.success("Profile updated.")
    },

    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to update your profile"
          : "Failed to update your profile",
      )
    },
  })

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(async (data) => {
          updateProfile.mutate(data)
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Update</Button>
      </form>
    </Form>
  )
}

export function UpdateProfileFormSkeletion() {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
