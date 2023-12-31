import { Task } from '@/domain/entities'
import { TaskStatus } from '@/domain/enums'

export type UpdateTaskCommand = {
  id: string
  userId: string
  title?: string
  description?: string
  dueDate?: Date
  status?: TaskStatus
}

export type UpdateTaskOutput = Omit<Task, 'update'>
