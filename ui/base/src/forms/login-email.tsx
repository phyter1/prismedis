"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { LoginEmailSchema } from "@prismedis/validators/login-register"

import { Button } from "../button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form"
import { Input } from "../input"
import { toast } from "../toast"

export function LoginEmailForm({
  action,
}: {
  action: (
    values: LoginEmailSchema,
  ) => Promise<{ error?: string; success?: boolean }>
}) {
  const form = useForm<LoginEmailSchema>({
    resolver: zodResolver(LoginEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: LoginEmailSchema) => {
    const res = await action(values)
    if (res?.error) {
      toast.error(res.error, {
        position: "bottom-center",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormDescription>
                {/* This is your public display name. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" variant="secondary" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  )
}
