import { Task } from '@/domain/entities'
import { TaskStatus } from '@/domain/enums'

export type ListTasksCommand = {
  userId: string
  status?: TaskStatus
}

export type ListTasksOutput = Omit<Task, 'update'>[]
