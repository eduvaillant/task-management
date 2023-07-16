import { Task } from '../../../entities'

export type ListTasksCommand = {
  userId: string
}

export type ListTasksOutput = Omit<Task, 'update'>[]
