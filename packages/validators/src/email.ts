import { z } from "zod"

export const EmailMessageInputSchema = z.object({
  from: z.string().email("Please enter a valid email address."),
  to: z.string().email("Please enter a valid email address."),
  subject: z.string(),
})

export type EmailMessageInputSchema = z.infer<typeof EmailMessageInputSchema>

export const EmailMessageTestInputSchema = EmailMessageInputSchema.extend({
  template: z.string(),
})

export type EmailMessageTestInputSchema = z.infer<
  typeof EmailMessageTestInputSchema
>

export const EmailMessageSchema = EmailMessageInputSchema.extend({
  text: z.string(),
  html: z.string(),
})

export type EmailMessageSchema = z.infer<typeof EmailMessageSchema>
