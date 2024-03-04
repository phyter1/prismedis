import { ObjectId } from "mongodb"

import { connect } from "./papr"
import Verification from "./schema/verification"

export const db = {
  ObjectId,
  verification: Verification,
}

export * from "./papr"

connect().catch(console.error)
