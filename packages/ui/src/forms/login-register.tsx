"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { LoginRegisterSchema } from "@prismedis/validators/login-register"

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

export function LoginRegisterForm({
  action,
}: {
  action: (
    values: LoginRegisterSchema,
  ) => Promise<{ error?: string; success?: boolean }>
}) {
  const [loading, setLoading] = useState(false)
  const form = useForm<LoginRegisterSchema>({
    resolver: zodResolver(LoginRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginRegisterSchema) => {
    setLoading(true)
    const res = await action(values)
    if (res?.error) {
      setLoading(false)
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription>
                {/* This is your public display name. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="w-full"
          variant="secondary"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </Form>
  )
}
