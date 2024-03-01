import { schema, types } from "papr"

import papr from "../papr"

const taskSchema = schema({
  title: types.string(),
  description: types.string(),
  completed: types.boolean(),
})

export type TaskDocument = typeof taskSchema

const Task = papr.model("tasks", taskSchema)

export default Task
