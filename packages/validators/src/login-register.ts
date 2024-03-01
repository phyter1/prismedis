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
