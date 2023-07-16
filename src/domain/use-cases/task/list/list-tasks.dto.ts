import { Task } from '../../../entities'
import { TaskStatus } from '../../../enums'

export type ListTasksCommand = {
  userId: string
  status?: TaskStatus
}

export type ListTasksOutput = Omit<Task, 'update'>[]
