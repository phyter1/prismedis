import { connect } from "./papr"
import Task from "./schema/task"
import Verification from "./schema/verification"

export const db = {
  task: Task,
  verification: Verification,
}

export * from "./papr"

connect().catch(console.error)
