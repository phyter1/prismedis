import { schema, types } from "papr"

import papr from "../papr"

const verificationSchema = schema(
  {
    user: types.string({
      required: true,
    }),
    code: types.string({
      required: true,
    }),
    type: types.enum(["email", "phone"], {
      required: true,
    }),
  },
  {
    timestamps: true,
  },
)

export type VerificationDocument = typeof verificationSchema

const Verification = papr.model("verifications", verificationSchema)

export default Verification
