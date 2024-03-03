import { z } from "zod"

export const LoginRegisterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.",
    ),
})

export type LoginRegisterSchema = z.infer<typeof LoginRegisterSchema>

export const LoginEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

export type LoginEmailSchema = z.infer<typeof LoginEmailSchema>

export const LoginVerificationSchema = z.object({
  code: z
    .string()
    .length(6, "Verification code must be 6 digits.")
    .regex(/^\d+$/, "Verification code must be a number."),
})

export type LoginVerificationSchema = z.infer<typeof LoginVerificationSchema>
