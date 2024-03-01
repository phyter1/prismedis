import { connect } from "./papr"
import Task from "./schema/task"

export const db = {
  task: Task,
}

export * from "./papr"

connect().catch(console.error)
