import { Task } from 'src/domain/entities/task/task.entity'
import { TaskStatus } from 'src/domain/enums'

export type CreateTaskCommand = {
  title: string
  description: string
  dueDate: Date
  status: TaskStatus
  userId: string
}

export type CreateTaskOutput = Omit<Task, 'update'>
