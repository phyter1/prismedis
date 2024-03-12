"use client"

import { useState } from "react"
import OtpInput from "react-otp-input"

import { LoginVerificationSchema } from "@prismedis/validators/login-register"

import { Input } from "../input"
import { toast } from "../toast"

export function VerifyCodeForm({
  action,
}: {
  action: (
    values: LoginVerificationSchema,
  ) => Promise<{ error?: string; success?: boolean }>
}) {
  const [otp, setOtp] = useState<string>("")

  const onSubmit = async (values: LoginVerificationSchema) => {
    const sanitizedOtp = LoginVerificationSchema.safeParse(values)
    if (!sanitizedOtp.success) {
      toast.error("Invalid OTP", {
        position: "bottom-center",
      })
      return
    }
    const res = await action(sanitizedOtp.data)
    if (res?.error) {
      toast.error(res.error, {
        position: "bottom-center",
      })
    }
  }

  const handleChange = async (code: string) => {
    setOtp(code)
    const sanitizedcode = LoginVerificationSchema.safeParse({ code })
    if (sanitizedcode.success) {
      await onSubmit(sanitizedcode.data)
    }
  }

  return (
    <OtpInput
      skipDefaultStyles
      shouldAutoFocus
      value={otp}
      onChange={handleChange}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => (
        <Input {...props} type="tel" className="text-center" />
      )}
    />
  )
}
