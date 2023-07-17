import { Task } from '@/domain/entities/task/task.entity'
import { TaskStatus } from '@/domain/enums'

export type CreateTaskCommand = {
  title: string
  description: string
  dueDate: Date
  status: TaskStatus
  userId: string
}

export type CreateTaskOutput = Omit<Task, 'update'>
